"use client";

import dynamic from "next/dynamic";

import { DepartmentsHero } from "@/features/departments/departments-hero";
import { DeferredMount } from "@/shared/ui/deferred-mount";

const DepartmentsStructureSection = dynamic(() =>
  import("@/features/departments/departments-structure-section").then((m) => ({
    default: m.DepartmentsStructureSection,
  }))
);

const DepartmentsBookSection = dynamic(
  () =>
    import("@/features/departments/departments-book-section").then((m) => ({
      default: m.DepartmentsBookSection,
    })),
  { ssr: false }
);

const DepartmentsRecruitmentSection = dynamic(() =>
  import("@/features/departments/departments-recruitment-section").then((m) => ({
    default: m.DepartmentsRecruitmentSection,
  }))
);

export function DepartmentsContent() {
  return (
    <div className="v2-dark-shell min-h-screen">
      <DepartmentsHero />
      <DeferredMount minHeight="28rem" rootMargin="320px 0px">
        <DepartmentsStructureSection />
      </DeferredMount>
      <DeferredMount minHeight="32rem" rootMargin="240px 0px">
        <DepartmentsBookSection />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="200px 0px">
        <DepartmentsRecruitmentSection />
      </DeferredMount>
    </div>
  );
}
