export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Comedy<span className="text-purple-600">Hub</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Discover live stand-up comedy shows, track your favorite comedians, and never miss a performance again.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-lg font-semibold mb-2">Discover Shows</h3>
              <p className="text-gray-600 dark:text-gray-300">Find comedy shows happening near you tonight or plan ahead for upcoming performances.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold mb-2">Track Comedians</h3>
              <p className="text-gray-600 dark:text-gray-300">Follow your favorite comedians and get notified when they announce new shows.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-lg font-semibold mb-2">Get Alerts</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive personalized notifications for shows you won't want to miss.</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              Find Shows
            </button>
            <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium px-8 py-3 rounded-lg transition-colors">
              Browse Comedians
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
