# ML Backstage Plugin
Custom ML/AI unified GUI/panel built with Backstage.

* Install App Accelerator: (see https://docs.vmware.com/en/Tanzu-Application-Platform/1.0/tap/GUID-cert-mgr-contour-fcd-install-cert-mgr.html)
```
tanzu package available list accelerator.apps.tanzu.vmware.com --namespace tap-install
tanzu package install accelerator -p accelerator.apps.tanzu.vmware.com -v 1.0.1 -n tap-install -f resources/app-accelerator-values.yaml
Verify that package is running: tanzu package installed get accelerator -n tap-install
Get the IP address for the App Accelerator API: kubectl get service -n accelerator-system
```

Publish Accelerators:
```
tanzu plugin install --local <path-to-tanzu-cli> all
tanzu acc create ml-backstage-plugin-accelerator --git-repository https://github.com/agapebondservant/ml-backstage-plugin-accelerator.git --git-branch main
```

# Setting up Backstage Plugin
Prerequisites: see <a href="https://backstage.io/docs/getting-started/#prerequisites" target="_blank">Backstage docs</a>

1. Install Backstage:
```
source .env
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
npm install --global yarn
yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react material-table@1.36.0 @material-ui/icons @mui/styles @mui/lab axios js-yaml -W;
```

## NOTE: Steps 2-9 are only required if a Backstage app has not already been generated.
2. Create Backstage app (follow prompts as shown):
```
source .env
echo $BACKSTAGE_APP_NM | npx @backstage/create-app@latest
cd $BACKSTAGE_APP_NM
yarn install
yarn dev
```

3. Install Postgres dependency (on Mac - one-time op; skip if already performed):
```
xcode-select --install
sudo port install postgresql15
echo "ALTER USER postgres WITH PASSWORD '$BACKSTAGE_PG_PASSWORD'" | PGPASSWORD=postgres psql -U postgres
```

4. Install the Postgres backend package for Backstage (one-time op; skip if already performed):
```
yarn add --cwd packages/backend pg
```

5. Install the GitHub App integration and follow the instructions as prompted (one-time op; skip if already performed):
```
yarn backstage-cli create-github-app $BACKSTAGE_GITHUB_ORG
```

6. Update **app-config.yaml** as directed by the instructions in the prior GitHub App integration step. 

7. Update configuration for the new backend package and GitHub App integration:
```
cp resources/*.yaml .
```

8. Start the Backstage app:
```
yarn dev
```

9. To create a new plugin:
```
echo "<name of plugin>" | yarn new --select plugin
```
10. To create a new component extension,

* Create the new component extension template:
```
export PLUGIN_NAME=<name of plugin>
export COMPONENT_NAME=<name of component>
echo "$PLUGIN_NAME" | yarn new --select plugin
rm -rf plugins/$PLUGIN_NAME/src/components/ExampleFetchComponent
mv plugins/$PLUGIN_NAME/src/components/ExampleComponent plugins/<name of component>/src/components/$PLUGIN_NAME
```

* Add the code below to the plugin.ts file (replace COMPONENT_NAME and PLUGIN_NAME with the values configured above,
and PLUGIN_NAME_CAMELCASE with the plugin in camel case - example, "mlworkflows-card" becomes "mlworkflowsCardPlugin"):
```
import { createComponentExtension } from '@backstage/core-plugin-api';
export const COMPONENT_NAME = PLUGIN_NAME_CAMELCASE.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/COMPONENT_NAME').then(m => m.COMPONENT_NAME),
    },
  }),
);
```

* Add the code below to the index.ts file (replace COMPONENT_NAME with the values configured above):
```
export { COMPONENT_NAME } from './plugin';
```

11. Create a new backend plugin:
```
export BACKEND_PLUGIN_NAME=<name of plugin>
echo "$BACKEND_PLUGIN_NAME" | yarn new --select backend-plugin
yarn add --cwd packages/backend @internal/plugin-${BACKEND_PLUGIN_NAME}-backend@^0.1.0
```
12. 

# Run the Backstage plugin locally
Run:
```
yarn dev
```
# Deploy the Backstage plugin as a TAP workload

* Deploy the workload:
```
tanzu apps workload create ml-backstage-plugin-app -f config/workload.yaml --yes
```

* Tail the logs of the main app:
```
tanzu apps workload tail ml-backstage-plugin-app --since 64h
```

* Once deployment succeeds, get the URL for the main app:
```
tanzu apps workload get ml-backstage-plugin-app     #should yield image-processor.default.<your-domain>
```

* To delete the app:
```
tanzu apps workload delete ml-backstage-plugin-app --yes
```