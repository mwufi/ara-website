export default function Loading() {
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold py-4 text-center border-b">AI Chat</h1>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="border-t p-4 flex items-center space-x-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  )
} 