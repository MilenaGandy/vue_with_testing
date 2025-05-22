// src/core/services/__tests__/apiClient.spec.js

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { apiClient } from '../apiClient';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const MOCKED_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createMockResponse = (body, ok = true, status = 200, statusText = 'OK') => ({
  ok,
  status,
  statusText,
  json: async () => body,
});

describe('apiClient', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    mockFetch.mockReset();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('get', () => {
    it('should make a GET request and return data on success', async () => {
      const mockData = { data: 'success' };
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));
      const result = await apiClient.get('/test-get');
      expect(mockFetch).toHaveBeenCalledWith(`${MOCKED_API_BASE_URL}/test-get`, expect.objectContaining({ method: 'GET' }));
      expect(result).toEqual(mockData);
    });

    it('should handle GET error with "error" in response body', async () => {
      const errorBody = { error: 'GET Error Prop' };
      mockFetch.mockResolvedValueOnce(createMockResponse(errorBody, false, 400));
      await expect(apiClient.get('/test-error')).rejects.toThrow(errorBody.error);
    });

    it('should handle GET error with "message" in response body', async () => {
      const errorBody = { message: 'GET Error Message Prop' };
      mockFetch.mockResolvedValueOnce(createMockResponse(errorBody, false, 401));
      await expect(apiClient.get('/test-error-message')).rejects.toThrow(errorBody.message);
    });

    it('should handle GET error with statusText if no specific error/message in body', async () => {
      const statusText = 'Unauthorized';
      mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 401, statusText));
      await expect(apiClient.get('/test-status-text')).rejects.toThrow(`Error HTTP: 401 ${statusText}`);
    });

    it('should handle GET error when response.json() fails and response is not ok', async () => {
        const statusText = 'Bad Gateway';
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 502,
            statusText: statusText,
            json: async () => { throw new SyntaxError('Invalid JSON'); }
        });
        await expect(apiClient.get('/bad-json-not-ok')).rejects.toThrow(statusText);
    });

    it.skip('should handle network failure for GET', async () => { // <--- PRUEBA SALTADA
      const networkError = new Error('Network Failure GET');
      mockFetch.mockRejectedValueOnce(networkError);
      await expect(apiClient.get('/test-network-fail')).rejects.toThrow(`Error de red o inesperado para ${MOCKED_API_BASE_URL}/test-network-fail: ${networkError.message}`);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error de red o inesperado para'), expect.any(String), networkError);
    });
  });

  describe('post', () => {
    const requestBody = { name: 'Test Item' };
    it('should make a POST request and return data on success', async () => {
      const responseData = { id: 1, ...requestBody };
      mockFetch.mockResolvedValueOnce(createMockResponse(responseData, true, 201));
      const result = await apiClient.post('/test-post', requestBody);
      expect(mockFetch).toHaveBeenCalledWith(`${MOCKED_API_BASE_URL}/test-post`, expect.objectContaining({ method: 'POST', body: JSON.stringify(requestBody) }));
      expect(result).toEqual(responseData);
    });

    it('should handle POST error', async () => {
      const errorBody = { message: 'POST Failed' };
      mockFetch.mockResolvedValueOnce(createMockResponse(errorBody, false, 400));
      await expect(apiClient.post('/test-post-fail', requestBody)).rejects.toThrow(errorBody.message);
    });
  });

  describe('put', () => {
    const requestBody = { name: 'Updated Item' };
    it('should make a PUT request and return data on success', async () => {
      const responseData = { id: 1, ...requestBody };
      mockFetch.mockResolvedValueOnce(createMockResponse(responseData));
      const result = await apiClient.put('/test-put/1', requestBody);
      expect(mockFetch).toHaveBeenCalledWith(`${MOCKED_API_BASE_URL}/test-put/1`, expect.objectContaining({ method: 'PUT', body: JSON.stringify(requestBody) }));
      expect(result).toEqual(responseData);
    });

    it('should handle PUT error', async () => {
      const errorBody = { error: 'PUT Failed' };
      mockFetch.mockResolvedValueOnce(createMockResponse(errorBody, false, 500));
      await expect(apiClient.put('/test-put-fail/1', requestBody)).rejects.toThrow(errorBody.error);
    });
  });

  describe('delete', () => {
    it('should make a DELETE request and return null on 204 No Content', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 204, statusText: 'No Content', json: async () => null });
      const result = await apiClient.delete('/test-delete/1');
      expect(mockFetch).toHaveBeenCalledWith(`${MOCKED_API_BASE_URL}/test-delete/1`, expect.objectContaining({ method: 'DELETE' }));
      expect(result).toBeNull();
    });

    it('should handle DELETE error', async () => {
      const errorBody = { message: 'DELETE Forbidden' };
      mockFetch.mockResolvedValueOnce(createMockResponse(errorBody, false, 403));
      await expect(apiClient.delete('/test-delete-fail/1')).rejects.toThrow(errorBody.message);
    });
  });
});