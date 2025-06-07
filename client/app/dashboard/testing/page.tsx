"use client";
import Ribbons from "@/Ribbons/Ribbons";

const page = () => {
  return (
    <>
      <div
        style={{ height: "500px", position: "relative", overflow: "hidden" }}
      >
        <Ribbons
          baseThickness={30}
          colors={["#ffffff"]}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={true}
        />
      </div>
    </>
  );
};

export default page;
