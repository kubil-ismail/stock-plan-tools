import svgPaths from "./svg-m85l4nib01";

function Heading() {
  return (
    <div className="content-stretch flex h-[41.594px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[41.6px] min-h-px min-w-px relative text-[#2a2826] text-[32px] tracking-[-0.64px]">Welcome back, John</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#8a8682] text-[14px] top-0 whitespace-nowrap">{`Here's your market overview for today`}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[70.594px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(249,115,22,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-[99.92px] text-[#8a8682] text-[12px] text-right top-[-1px] whitespace-nowrap">Portfolio Value</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] left-[100px] text-[#2a2826] text-[24px] text-right top-0 whitespace-nowrap">$52,890</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[56px] relative shrink-0 w-[99.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Pm1() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="PM">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[14px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6B9E7A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #6B9E7A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Pm2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="PM">
      <Icon1 />
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[19.5px] left-[18px] text-[#6b9e7a] text-[13px] top-[-1px] whitespace-nowrap">+8.5% this month</p>
    </div>
  );
}

function J() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-1 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Pm1 />
        <Pm2 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_361)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #D4704B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_361">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(212,112,75,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-[91px] text-[#8a8682] text-[12px] text-right top-[-1px] whitespace-nowrap">Active Positions</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] left-[90.14px] text-[#2a2826] text-[24px] text-right top-0 whitespace-nowrap">12</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[56px] relative shrink-0 w-[90.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Pm3() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="PM">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Pm4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">3 pending orders</p>
    </div>
  );
}

function J1() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-2 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Pm3 />
        <Pm4 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3c797180} id="Vector" stroke="var(--stroke-0, #6B9E7A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ac0b600} id="Vector_2" stroke="var(--stroke-0, #6B9E7A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(107,158,122,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-[102.14px] text-[#8a8682] text-[12px] text-right top-[-1px] whitespace-nowrap">Total Gain</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] left-[102px] text-[#6b9e7a] text-[24px] text-right top-0 whitespace-nowrap">+$2,450</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[56px] relative shrink-0 w-[101.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Pm5() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="PM">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Pm6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">+4.85% all time</p>
    </div>
  );
}

function J2() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-3 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Pm5 />
        <Pm6 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pe6b10c0} id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4c21d00} id="Vector_2" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(254,154,0,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-[55.02px] text-[#8a8682] text-[12px] text-right top-[-1px] whitespace-nowrap">Win Rate</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] left-[55px] text-[#2a2826] text-[24px] text-right top-0 whitespace-nowrap">68%</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[56px] relative shrink-0 w-[54.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Pm7() {
  return (
    <div className="content-stretch flex h-[56px] items-start justify-between relative shrink-0 w-full" data-name="PM">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Pm8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Based on 45 trades</p>
    </div>
  );
}

function J3() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-4 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Pm7 />
        <Pm8 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[133.5px] relative shrink-0 w-full" data-name="Container">
      <J />
      <J1 />
      <J2 />
      <J3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[143.906px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[28px] left-0 text-[#2a2826] text-[20px] top-0 tracking-[-0.2px] whitespace-nowrap">Market Indexes</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[57.3px] size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[21px] relative shrink-0 w-[73.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[26px] text-[#f97316] text-[14px] text-center top-0 whitespace-nowrap">View All</p>
        <Icon5 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_336)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_336">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(249,115,22,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#2a2826] text-[14px] top-0 whitespace-nowrap">{`S&P 500`}</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#8a8682] text-[12px] top-[-1px] whitespace-nowrap">^GSPC</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Pm9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[21px] top-[21px] w-[398px]" data-name="PM">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Pm10() {
  return (
    <div className="absolute h-[48px] left-[21px] top-[77px] w-[398px]" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#2a2826] text-[32px] top-0 whitespace-nowrap">5,127.48</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[27px] relative shrink-0 w-[17.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#6b9e7a] text-[18px] top-0 whitespace-nowrap">▲</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[72.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#6b9e7a] text-[18px] top-0 whitespace-nowrap">+0.64%</p>
      </div>
    </div>
  );
}

function Pm11() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[27px] items-center left-[21px] top-[133px] w-[398px]" data-name="PM">
      <Text />
      <Text1 />
    </div>
  );
}

function J4() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-1 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <Pm9 />
      <Pm10 />
      <Pm11 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_336)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_336">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[rgba(249,115,22,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#2a2826] text-[14px] top-0 whitespace-nowrap">NASDAQ Composite</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#8a8682] text-[12px] top-[-1px] whitespace-nowrap">^IXIC</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Pm12() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[21px] top-[21px] w-[398px]" data-name="PM">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Pm13() {
  return (
    <div className="absolute h-[48px] left-[21px] top-[77px] w-[398px]" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#2a2826] text-[32px] top-0 whitespace-nowrap">16,274.94</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[17.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#6b9e7a] text-[18px] top-0 whitespace-nowrap">▲</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[27px] relative shrink-0 w-[71.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#6b9e7a] text-[18px] top-0 whitespace-nowrap">+0.78%</p>
      </div>
    </div>
  );
}

function Pm14() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[27px] items-center left-[21px] top-[133px] w-[398px]" data-name="PM">
      <Text2 />
      <Text3 />
    </div>
  );
}

function J5() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-2 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <Pm12 />
      <Pm13 />
      <Pm14 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_336)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_336">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(249,115,22,0.1)] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#2a2826] text-[14px] top-0 whitespace-nowrap">Dow Jones</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#8a8682] text-[12px] top-[-1px] whitespace-nowrap">^DJI</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Pm15() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[21px] top-[21px] w-[398px]" data-name="PM">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Pm16() {
  return (
    <div className="absolute h-[48px] left-[21px] top-[77px] w-[398px]" data-name="PM">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#2a2826] text-[32px] top-0 whitespace-nowrap">39,087.38</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[27px] relative shrink-0 w-[17.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#e76b6b] text-[18px] top-0 whitespace-nowrap">▼</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[27px] relative shrink-0 w-[66.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#e76b6b] text-[18px] top-0 whitespace-nowrap">-0.12%</p>
      </div>
    </div>
  );
}

function Pm17() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[27px] items-center left-[21px] top-[133px] w-[398px]" data-name="PM">
      <Text4 />
      <Text5 />
    </div>
  );
}

function J6() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] col-3 justify-self-stretch relative rounded-[16px] row-1 self-stretch shrink-0" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <Pm15 />
      <Pm16 />
      <Pm17 />
    </div>
  );
}

function Container12() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[181px] relative shrink-0 w-full" data-name="Container">
      <J4 />
      <J5 />
      <J6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[225px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[111.188px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[28px] left-0 text-[#2a2826] text-[20px] top-0 tracking-[-0.2px] whitespace-nowrap">Top Gainers</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[57.3px] size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[73.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[26px] text-[#f97316] text-[14px] text-center top-0 whitespace-nowrap">View All</p>
        <Icon9 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button1 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[27px] relative shrink-0 w-[25.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#f97316] text-[18px] top-0 whitespace-nowrap">AA</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex h-[22.391px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.4px] min-h-px min-w-px relative text-[#2a2826] text-[16px]">AAPL</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Apple Inc.</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[41.891px] relative shrink-0 w-[61.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading3 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-[77px] text-[#2a2826] text-[20px] text-right top-0 whitespace-nowrap">$178.52</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[14.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[15px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">▲</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[55.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[56px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">+1.39%</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[6px] h-[22.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[76.641px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph16 />
        <Container28 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[56.5px] items-start justify-between left-0 top-0 w-[550px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Ve() {
  return (
    <div className="absolute bg-[rgba(212,112,75,0.1)] border border-[rgba(212,112,75,0.2)] border-solid h-[22.5px] left-0 rounded-[33554400px] top-[68.5px] w-[133.891px]" data-name="Ve">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] text-[#d4704b] text-[11px] top-px whitespace-nowrap">Consumer Electronics</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] h-[91px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container25 />
        <Ve />
      </div>
    </div>
  );
}

function Gl() {
  return (
    <div className="content-stretch flex gap-[16px] h-[91px] items-center relative shrink-0 w-full" data-name="gl">
      <Container23 />
      <Container24 />
    </div>
  );
}

function J7() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] h-[133px] relative rounded-[16px] shrink-0 w-full" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Gl />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[27px] relative shrink-0 w-[30.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#f97316] text-[18px] top-0 whitespace-nowrap">GO</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text9 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex h-[22.391px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.4px] min-h-px min-w-px relative text-[#2a2826] text-[16px]">GOOGL</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Alphabet Inc.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[41.891px] relative shrink-0 w-[81.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-[79.09px] text-[#2a2826] text-[20px] text-right top-0 whitespace-nowrap">$142.87</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[14.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[15px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">▲</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[57.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[58px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">+2.97%</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[6px] h-[22.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[78.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph18 />
        <Container34 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[56.5px] items-start justify-between left-0 top-0 w-[550px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Ve1() {
  return (
    <div className="absolute bg-[rgba(212,112,75,0.1)] border border-[rgba(212,112,75,0.2)] border-solid h-[22.5px] left-0 rounded-[33554400px] top-[68.5px] w-[106.672px]" data-name="Ve">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] text-[#d4704b] text-[11px] top-px whitespace-nowrap">Internet Services</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] h-[91px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container31 />
        <Ve1 />
      </div>
    </div>
  );
}

function Gl1() {
  return (
    <div className="content-stretch flex gap-[16px] h-[91px] items-center relative shrink-0 w-full" data-name="gl">
      <Container29 />
      <Container30 />
    </div>
  );
}

function J8() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] h-[133px] relative rounded-[16px] shrink-0 w-full" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Gl1 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[27px] relative shrink-0 w-[28.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#f97316] text-[18px] top-0 whitespace-nowrap">AM</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text12 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex h-[22.391px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.4px] min-h-px min-w-px relative text-[#2a2826] text-[16px]">AMZN</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Amazon.com Inc.</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[41.891px] relative shrink-0 w-[105.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading5 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-[80.11px] text-[#2a2826] text-[20px] text-right top-0 whitespace-nowrap">$178.25</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[14.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[15px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">▲</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[58.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[59px] text-[#6b9e7a] text-[15px] text-right top-0 whitespace-nowrap">+3.28%</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[6px] h-[22.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[79.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph20 />
        <Container40 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex h-[56.5px] items-start justify-between left-0 top-0 w-[550px]" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Ve2() {
  return (
    <div className="absolute bg-[rgba(212,112,75,0.1)] border border-[rgba(212,112,75,0.2)] border-solid h-[22.5px] left-0 rounded-[33554400px] top-[68.5px] w-[88.422px]" data-name="Ve">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] text-[#d4704b] text-[11px] top-px whitespace-nowrap">E-commerce</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] h-[91px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container37 />
        <Ve2 />
      </div>
    </div>
  );
}

function Gl2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[91px] items-center relative shrink-0 w-full" data-name="gl">
      <Container35 />
      <Container36 />
    </div>
  );
}

function J9() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] h-[133px] relative rounded-[16px] shrink-0 w-full" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Gl2 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[423px] items-start relative shrink-0 w-full" data-name="Container">
      <J7 />
      <J8 />
      <J9 />
    </div>
  );
}

function Container20() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-[101.031px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[28px] left-0 text-[#2a2826] text-[20px] top-0 tracking-[-0.2px] whitespace-nowrap">Top Losers</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[57.3px] size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[73.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[26px] text-[#f97316] text-[14px] text-center top-0 whitespace-nowrap">View All</p>
        <Icon10 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Button2 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[27px] relative shrink-0 w-[27.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#f97316] text-[18px] top-0 whitespace-nowrap">MS</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text15 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex h-[22.391px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.4px] min-h-px min-w-px relative text-[#2a2826] text-[16px]">MSFT</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Microsoft Corporation</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[41.891px] relative shrink-0 w-[137.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading7 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-[79.5px] text-[#2a2826] text-[20px] text-right top-0 whitespace-nowrap">$412.35</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[14.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[15px] text-[#e76b6b] text-[15px] text-right top-0 whitespace-nowrap">▼</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[57.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[58px] text-[#e76b6b] text-[15px] text-right top-0 whitespace-nowrap">-0.77%</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[6px] h-[22.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[78.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph22 />
        <Container49 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex h-[56.5px] items-start justify-between left-0 top-0 w-[550px]" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Ve3() {
  return (
    <div className="absolute bg-[rgba(212,112,75,0.1)] border border-[rgba(212,112,75,0.2)] border-solid h-[22.5px] left-0 rounded-[33554400px] top-[68.5px] w-[66.797px]" data-name="Ve">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] text-[#d4704b] text-[11px] top-px whitespace-nowrap">Software</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[91px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container46 />
        <Ve3 />
      </div>
    </div>
  );
}

function Gl3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[91px] items-center relative shrink-0 w-full" data-name="gl">
      <Container44 />
      <Container45 />
    </div>
  );
}

function J10() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] h-[133px] relative rounded-[16px] shrink-0 w-full" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Gl3 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[27px] relative shrink-0 w-[21.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#f97316] text-[18px] top-0 whitespace-nowrap">TS</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text18 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex h-[22.391px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.4px] min-h-px min-w-px relative text-[#2a2826] text-[16px]">TSLA</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#8a8682] text-[13px] top-[-1px] whitespace-nowrap">Tesla Inc.</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[41.891px] relative shrink-0 w-[55.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading8 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-[81.28px] text-[#2a2826] text-[20px] text-right top-0 whitespace-nowrap">$198.32</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[14.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[15px] text-[#e76b6b] text-[15px] text-right top-0 whitespace-nowrap">▼</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[59.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[22.5px] left-[60px] text-[#e76b6b] text-[15px] text-right top-0 whitespace-nowrap">-4.09%</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[6px] h-[22.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[80.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph24 />
        <Container55 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[56.5px] items-start justify-between left-0 top-0 w-[550px]" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Ve4() {
  return (
    <div className="absolute bg-[rgba(212,112,75,0.1)] border border-[rgba(212,112,75,0.2)] border-solid h-[22.5px] left-0 rounded-[33554400px] top-[68.5px] w-[104.156px]" data-name="Ve">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] text-[#d4704b] text-[11px] top-px whitespace-nowrap">Electric Vehicles</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="flex-[1_0_0] h-[91px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container52 />
        <Ve4 />
      </div>
    </div>
  );
}

function Gl4() {
  return (
    <div className="content-stretch flex gap-[16px] h-[91px] items-center relative shrink-0 w-full" data-name="gl">
      <Container50 />
      <Container51 />
    </div>
  );
}

function J11() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] h-[133px] relative rounded-[16px] shrink-0 w-full" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Gl4 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[278px] items-start relative shrink-0 w-full" data-name="Container">
      <J10 />
      <J11 />
    </div>
  );
}

function Container41() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container19() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[467px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container41 />
    </div>
  );
}

function Pm() {
  return (
    <div className="bg-[#faf7f2] h-[1121.094px] relative shrink-0 w-full" data-name="PM">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[97px] px-[106px] relative size-full">
        <Container />
        <Container1 />
        <Container10 />
        <Container19 />
      </div>
    </div>
  );
}

function Section() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function SM() {
  return (
    <div className="absolute bg-[#faf7f2] content-stretch flex flex-col h-[775px] items-start left-0 top-0 w-[1564px]" data-name="sM">
      <Pm />
      <Section />
    </div>
  );
}

function Om1() {
  return <div className="bg-gradient-to-b from-[#f97316] rounded-[8px] shrink-0 size-[24px] to-[#d4704b]" data-name="OM" />;
}

function J12() {
  return (
    <div className="bg-[rgba(255,255,255,0.65)] relative rounded-[16px] shrink-0 size-[40px]" data-name="J">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Om1 />
      </div>
    </div>
  );
}

function Om2() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative" data-name="OM">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#2a2826] text-[20px] top-0 whitespace-nowrap">Stockplan</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[40px] relative shrink-0 w-[151.781px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <J12 />
        <Om2 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="flex-[1_0_0] h-[37px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon11 />
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[77.5px] text-[#8a8682] text-[14px] text-center top-[8px] whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[102.734px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon12 />
        <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[40px] text-[#8a8682] text-[14px] top-[8px] whitespace-nowrap">Market</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1c647980} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13d22180} id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[114.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon13 />
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[69.5px] text-[#8a8682] text-[14px] text-center top-[8px] whitespace-nowrap">Portfolio</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[92.766px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon14 />
        <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[58.5px] text-[#8a8682] text-[14px] text-center top-[8px] whitespace-nowrap">Ideas</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[37px] relative shrink-0 w-[452.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button3 />
        <Link1 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[21px] left-[36px] top-[8px] w-[47.047px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[21px] left-[24px] text-[#8a8682] text-[14px] text-center top-0 whitespace-nowrap">Search</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[6px] size-[12px] top-[4.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p345f6980} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Kbd() {
  return (
    <div className="absolute bg-[rgba(232,228,222,0.3)] h-[20.5px] left-[95.05px] rounded-[4px] top-[8.25px] w-[32.609px]" data-name="Kbd">
      <Icon16 />
      <p className="-translate-x-1/2 absolute font-['Liberation_Mono:Medium',sans-serif] leading-[16.5px] left-[23.5px] not-italic text-[#8a8682] text-[11px] text-center top-[2px] whitespace-nowrap">K</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[37px] left-0 rounded-[10px] top-0 w-[139.656px]" data-name="Button">
      <Icon15 />
      <Text21 />
      <Kbd />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[33554400px] size-[36px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(212, 112, 75, 0.2) 100%)" }}>
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[#f97316] text-[14px] text-center whitespace-nowrap">JD</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute left-[199.66px] size-[36px] top-[0.5px]" data-name="Button">
      <Container59 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #8A8682)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return <div className="absolute bg-[#fb2c36] border-2 border-[#faf7f2] border-solid left-[24px] rounded-[33554400px] size-[8px] top-[4px]" data-name="Container" />;
}

function Button8() {
  return (
    <div className="absolute left-[151.66px] rounded-[10px] size-[36px] top-[0.5px]" data-name="Button">
      <Icon17 />
      <Container60 />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[37px] relative shrink-0 w-[235.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[0.016px] relative size-full">
          <Link />
          <Container57 />
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function Om() {
  return (
    <div className="absolute bg-[rgba(250,247,242,0.8)] content-stretch flex flex-col h-[65px] items-start left-0 pb-px px-[106px] top-0 w-[1564px]" data-name="OM">
      <div aria-hidden="true" className="absolute border-[rgba(42,40,38,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container56 />
    </div>
  );
}

export default function StockplanDashboardDesign() {
  return (
    <div className="bg-white relative size-full" data-name="Stockplan Dashboard Design">
      <SM />
      <Om />
    </div>
  );
}