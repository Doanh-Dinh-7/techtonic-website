import MapWithShrinkingCircle from "@/components/maps/map-with-shrinking-circle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MapsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background pt-5">
      <div className="w-full max-w-7xl p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Quay lại trang chủ
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary">Bản đồ tương tác</h1>
          <p className="text-muted-foreground">
            Khám phá vị trí của bạn với vòng tròn thu nhỏ dần.
          </p>
        </div>

        <div className="w-full rounded-lg overflow-hidden border bg-card">
          <MapWithShrinkingCircle />
        </div>
      </div>
    </main>
  );
}
