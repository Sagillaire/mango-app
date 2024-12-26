"use client";
import { Button } from "@components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  return (
    <div>
      <h1 className="title">Mango Range Aplication</h1>

      <center>
        <h3>Here you can choose a Range mode</h3>
      </center>
      <div className="buttons-container">
        <Button onClick={() => push("/exercise1")} children={"Normal"} />
        <Button onClick={() => push("/exercise2")} children={"Fixed"} />
      </div>
    </div>
  );
}
