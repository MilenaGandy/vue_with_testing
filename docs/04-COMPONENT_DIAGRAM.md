# Diagrama de Componentes

Este diagrama muestra la jerarquía y las relaciones principales entre los componentes y vistas clave de la aplicación.

## Diagrama

A continuación, se presenta un diagrama utilizando la sintaxis de Mermaid. Si estás viendo este archivo en una plataforma que renderiza Mermaid (como GitHub o algunos editores de Markdown), deberías ver el diagrama visual.



```mermaid
graph TD
    subgraph "Aplicación Principal (App.vue)"
        A[App.vue]
    end

    subgraph "Layout Principal (core/layouts/default.vue)"
        L[DefaultLayout.vue]
        LErr[core/components/AppErrorDialog.vue]
        LHeader["core/components/AppHeader.vue - Conceptual"]
        LFooter["core/components/AppFooter.vue - Conceptual"]
    end

    subgraph "Vistas de Página (cargadas por router-view)"
        H["core/pages/HomeView.vue"]
        CLV["modules/characters/pages/CharactersListView.vue"]
        CDV["modules/characters/pages/CharacterDetailView.vue"]
    end

    subgraph "Interacciones y Flujo"
        NNav1["Navegación (RouterLink)"]
        NNav2["Navegación (RouterLink)"]
        DataFlow["Flujo de Datos (Pinia Store)"]
        Render["Renderizado de Lista/Detalle"]
    end

    A --> L;
    L --> LHeader;
    L --> RouterView["<router-view />"];
    L --> LErr;
    L --> LFooter;

    RouterView --> H;
    RouterView --> CLV;
    RouterView --> CDV;

    H -- "clic" --> NNav1;
    NNav1 -- "/characters" --> CLV;

    CLV -- "Usa Store para" --> DataFlow;
    CLV -- "Renderiza Tarjetas de" --> Render;
    Render -- "clic" --> NNav2;
    NNav2 -- "/characters/:id" --> CDV;

    CDV -- "Usa Store para" --> DataFlow;
    CDV -- "Renderiza Detalles de" --> Render;

    style App fill:#f9f,stroke:#333,stroke-width:2px,color:#fff
    style Layout fill:#ccf,stroke:#333,stroke-width:2px
    style RouterView fill:#lightgrey,stroke:#333,stroke-width:2px
    style Vistas fill:#cfc,stroke:#333,stroke-width:2px
    style Interacciones fill:#f96,stroke:#333,stroke-width:2px,color:#fff