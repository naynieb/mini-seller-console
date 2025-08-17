import { DataProvider } from './context/DataContext';
import { UIProvider } from './context/UIContext';
import Layout from './components/layout/Layout';
import LeadsList from './components/leads/LeadsList';
import LeadDetailPanel from './components/leads/LeadDetailPanel';
import OpportunitiesList from './components/opportunities/OpportunitiesList';

function App() {
  return (
    <DataProvider>
      <UIProvider>
        <Layout>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your leads and opportunities</p>
              </div>
            </div>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900">Leads</h2>
              </div>
              <LeadsList />
            </section>

            <section>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900">Opportunities</h2>
              </div>
              <OpportunitiesList />
            </section>
          </div>
          
          <LeadDetailPanel />
        </Layout>
      </UIProvider>
    </DataProvider>
  );
}

export default App;
