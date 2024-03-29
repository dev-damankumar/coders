const UndoIcon = ({
  width = 10,
  height = 10,
}: {
  width: number;
  height: number;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      enableBackground='new 0 0 512.011 512.011'
      version='1.1'
      width={width}
      height={height}
      viewBox='0 0 512.011 512.011'
      xmlSpace='preserve'
    >
      <path
        fill='#FFC107'
        d='M328 128.015H192v-80a16.05 16.05 0 00-9.056-14.432c-5.568-2.656-12.128-1.952-16.928 1.92l-160 128C2.208 166.575 0 171.151 0 176.015s2.208 9.44 5.984 12.512l160 128A16.158 16.158 0 00176 320.015c2.368 0 4.736-.512 6.944-1.568A16.05 16.05 0 00192 304.015v-80h139.392c41.856 0 80 30.08 84.192 71.712 4.832 47.872-32.704 88.288-79.584 88.288H208c-8.832 0-16 7.168-16 16v64c0 8.832 7.168 16 16 16h128c102.816 0 185.472-88.864 175.136-193.76-9.056-91.392-91.296-158.24-183.136-158.24z'
      ></path>
    </svg>
  );
};

export default UndoIcon;
