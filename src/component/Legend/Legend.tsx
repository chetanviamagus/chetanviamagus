import React from 'react';

const LegendWithoutMemo: React.FC<any> = (props: any) => {
  const { className, shape, label, fillColor, labelClassNames, xAxisIcons } =
    props;
  return (
    <>
      <div className={'flex items-center ' + className}>
        <div
          style={{ backgroundColor: fillColor }}
          className={
            'w-3 h-3 mr-2 mt-0.5 ' + (shape === 'circle' ? 'rounded-full' : '')
          }
        />

        <div className={labelClassNames}>{label}</div>
      </div>
    </>
  );
};

// ------------------- memoization --------------------- //
const Legend = React.memo(LegendWithoutMemo);

// ------------------ redux wiring -------------------- //

// ------------------ exports --------------------- //
export default Legend;
