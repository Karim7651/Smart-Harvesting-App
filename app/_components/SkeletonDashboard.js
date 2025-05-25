import Skeleton from "@/components/ui/skeleton";
import LoadingDots from "./LoadingDots";

export default function SkeletonDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 p-8 min-h-[80svh]">
      <Skeleton className="relative w-full h-full rounded-md bg-base-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingDots />
        </div>
      </Skeleton>
    </div>
  );
}
