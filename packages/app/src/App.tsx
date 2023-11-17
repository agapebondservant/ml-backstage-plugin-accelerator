import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import StorageIcon from '@mui/icons-material/Storage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { MlworkflowsDataPage } from '@internal/plugin-mlworkflows-data';
import { MlworkflowsPage } from '@internal/plugin-mlworkflows';
import { MlworkflowsModelsPage } from '@internal/plugin-mlworkflows-models';
import { MlworkflowsPipelinesPage } from '@internal/plugin-mlworkflows-pipelines';
import { MlworkflowsClustersPage } from '@internal/plugin-mlworkflows-clusters';
import { MlworkflowsExperimentsPage } from '@internal/plugin-mlworkflows-experiments';

import { createTheme, darkTheme, lightTheme } from '@backstage/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/Brightness2';
import { MlworkflowsCardPage } from '@internal/plugin-mlworkflows-card';
import { MlworkflowsDialogPage } from '@internal/plugin-mlworkflows-dialog';
import { MlworkflowsBasePage } from '@internal/plugin-mlworkflows-base';

const demoTheme = createTheme({
  palette: darkTheme.palette,
});

const app = createApp({
  apis,
  icons: {
    autograph: AutoGraphIcon,
    storage: StorageIcon,
    accounttree: AccountTreeIcon,
    groupwork: GroupWorkIcon,
    hourglass: HourglassBottomIcon,
  },
  themes: [{
      id: 'demo-theme',
      title: 'Demo Theme',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: ({ children }) => (
        <ThemeProvider theme={demoTheme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      ),

  }],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/mlworkflows-data" element={<MlworkflowsDataPage />} />
    <Route path="/mlworkflows" element={<MlworkflowsPage />} />
    <Route path="/mlworkflows-models" element={<MlworkflowsModelsPage />} />
    <Route path="/mlworkflows-pipelines" element={<MlworkflowsPipelinesPage />} />
    <Route path="/mlworkflows-clusters" element={<MlworkflowsClustersPage />} />
    <Route path="/mlworkflows-experiments" element={<MlworkflowsExperimentsPage />} />
    <Route path="/mlworkflows-card" element={<MlworkflowsCardPage />} />
    <Route path="/mlworkflows-dialog" element={<MlworkflowsDialogPage />} />
    <Route path="/mlworkflows-base" element={<MlworkflowsBasePage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
