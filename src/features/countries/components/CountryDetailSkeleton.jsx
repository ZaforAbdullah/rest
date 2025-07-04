export default function CountryDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-6">
            <div className="max-w-7xl mx-auto animate-pulse">
                <div className="mb-6 h-10 w-24 bg-muted rounded" />
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2 h-64 bg-muted rounded" />
                    <div className="flex-1 space-y-3">
                        <div className="h-8 w-3/4 bg-muted rounded" />
                        <div className="h-4 w-1/2 bg-muted rounded" />
                        <div className="h-4 w-2/3 bg-muted rounded" />
                        <div className="h-4 w-1/3 bg-muted rounded" />
                        <div className="h-4 w-1/2 bg-muted rounded" />
                        <div className="h-4 w-2/3 bg-muted rounded" />
                        <div className="h-4 w-1/4 bg-muted rounded" />
                        <div className="h-6 w-40 mt-6 bg-muted rounded" />
                        <div className="flex gap-2 mt-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-8 w-20 bg-muted rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
