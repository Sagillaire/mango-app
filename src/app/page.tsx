"use client";
import { Range } from "@components/Range";
import { useGetDataRanges } from "@hooks/useGetDataRanges";
import { useSimulatedData } from "@hooks/useSimulatedData";

export default function Page() {
  const { range, isLoading } = useSimulatedData({});
  const { arrayRanges, isLoading: isLoadingArray } = useGetDataRanges();

  return (
    <div>
      <h1 className="title">Mango Range Aplication</h1>

      <h3 className="subtitle">Normal Mode:</h3>
      <Range
        min={range?.min}
        max={range?.max}
        mode="normal"
        loading={isLoading}
      />
      <h3 className="subtitle">Fixed Mode:</h3>
      <Range mode="fixed" values={arrayRanges} loading={isLoadingArray} />
    </div>
  );
}
