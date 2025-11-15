// components/LoadingState.tsx

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading air quality data...</p>
      </div>
    </div>
  );
}
