export default function WavePattern() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      className="absolute top-0 left-0 w-[500px] opacity-20 pointer-events-none"
      fill="none"
      stroke="white"
      strokeWidth="1"
    >
      <path d="M0,200 C200,100 400,300 600,200 S1000,300 1200,200" />
      <path d="M0,220 C200,120 400,320 600,220 S1000,320 1200,220" />
      <path d="M0,240 C200,140 400,340 600,240 S1000,340 1200,240" />
      <path d="M0,260 C200,160 400,360 600,260 S1000,360 1200,260" />
      <path d="M0,280 C200,180 400,380 600,280 S1000,380 1200,280" />
      <path d="M0,300 C200,200 400,400 600,300 S1000,400 1200,300" />
      <path d="M0,320 C200,220 400,420 600,320 S1000,420 1200,320" />
      <path d="M0,340 C200,240 400,440 600,340 S1000,440 1200,340" />
    </svg>
  );
}