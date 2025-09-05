export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white bg-opacity-20 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-3 bg-white bg-opacity-15 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
