"use client";
import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { useSimulatedData } from "@hooks/useSimulatedData";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const Page = () => {
  const { back } = useRouter();
  const { range, isLoading } = useSimulatedData({});

  return (
    <Fragment>
      <div className="header-container">
        <h3 className="subtitle">Normal Mode:</h3>
        <Button children={"Go Back"} onClick={back} />
      </div>
      <Range
        min={range?.min}
        max={range?.max}
        mode="normal"
        loading={isLoading}
      />
    </Fragment>
  );
};

export default Page;
