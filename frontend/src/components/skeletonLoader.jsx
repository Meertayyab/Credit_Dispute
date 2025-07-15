// components/ui/SkeletonLoader.jsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader({ variant = "default", count = 4 }) {
  switch (variant) {
    case "table":
      return (
        <div className="space-y-4">
          {[...Array(count)].map((_, i) => (
            <div className="flex items-center space-x-4" key={i}>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          ))}
        </div>
      );

   case "card":
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border p-6 shadow bg-black text-white space-y-4"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" /> {/* Package Name */}
            <Skeleton className="h-6 w-16 rounded-full" /> {/* Badge */}
          </div>

          <Skeleton className="h-8 w-1/2" /> {/* Price */}
          <Skeleton className="h-4 w-1/3" /> {/* Service info */}

          <div className="space-y-2">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} className="h-3 w-full" /> // Feature list
            ))}
          </div>

          <Skeleton className="h-10 w-full rounded-md" /> {/* Buy button */}
        </div>
      ))}
    </div>
  );

    case "profile":
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      );

    case "payment":
      return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-6 w-1/3" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          {[...Array(count)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      );
  }
}
