export default function AtomicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Blob
        className="bg-primary"
        size="w-[28rem] h-[28rem]"
        motion="animate-[atom-float1_32s_linear_infinite] animate-fill"
        delay="animation-offset-0"
      />

      <Blob
        className="bg-secondary"
        size="w-[30rem] h-[30rem]"
        motion="animate-[atom-float2_38s_linear_infinite] animate-fill"
        delay="animation-offset-6"
      />

      <Blob
        className="bg-accent"
        size="w-[26rem] h-[26rem]"
        motion="animate-[atom-float3_45s_linear_infinite] animate-fill"
        delay="animation-offset-10"
      />
    </div>
  );
}

function Blob({ className, size, motion, delay }) {
  return (
    <div
      className={`
    absolute inset-1/2
    -translate-x-1/2 -translate-y-1/2
    ${size}
    ${className}
    rounded-full
    mix-blend-multiply
    blur-2xl
    opacity-60
    will-change-transform
    ${motion}
    ${delay ?? ""}
  `}
    />
  );
}
