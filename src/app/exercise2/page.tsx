"use client";
import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { useGetDataRanges } from "@hooks/useGetDataRanges";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const Page = () => {
  const { back } = useRouter();
  const { arrayRanges, isLoading: isLoadingArray } = useGetDataRanges();

  return (
    <Fragment>
      <div className="header-container">
        <h3 className="subtitle">Fixed Mode:</h3>
        <Button children={"Go Back"} onClick={back} />
      </div>
      <Range mode="fixed" values={arrayRanges} loading={isLoadingArray} />
    </Fragment>
  );
};

export default Page;
