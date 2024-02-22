const LinkIcon = ({
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
      width={width}
      height={height}
      enableBackground='new 0 0 503.118 503.118'
      version='1.1'
      viewBox='0 0 503.118 503.118'
      xmlSpace='preserve'
    >
      <path
        fill='#FFD15C'
        d='M335.151 167.967c10.449 10.449 18.808 22.988 25.078 35.527 22.988 48.065 15.673 108.669-25.078 148.375L223.347 464.718c-51.2 51.2-133.747 51.2-183.902 0-51.2-51.2-51.2-133.747 0-183.902l79.412-79.412c-9.404 31.347-8.359 64.784 3.135 95.086l-33.437 33.437c-22.988 22.988-22.988 61.649 0 85.682 24.033 24.033 61.649 24.033 85.682 0l111.804-111.804c11.494-11.494 17.763-27.167 17.763-42.841s-6.269-31.347-17.763-42.841c-11.494-11.494-27.167-17.763-42.841-17.763l56.424-56.424c12.539 5.223 24.033 13.582 35.527 24.031z'
      ></path>
      <path
        fill='#FF7058'
        d='M167.967 335.151c-10.449-10.449-18.808-22.988-25.078-35.527-22.988-48.065-15.673-108.669 25.078-148.376L279.771 38.4c51.2-51.2 133.747-51.2 183.902 0 51.2 51.2 51.2 133.747 0 183.902l-79.412 79.412c9.404-31.347 8.359-64.784-3.135-95.086l33.437-33.437c22.988-22.988 22.988-61.649 0-85.682-24.033-24.033-61.649-24.033-85.682 0l-110.759 112.85c-11.494 11.494-17.763 27.167-17.763 42.841s6.269 31.347 17.763 42.841c11.494 11.494 27.167 17.763 42.841 17.763l-56.424 56.424c-13.584-6.269-25.078-14.628-36.572-25.077z'
      ></path>
    </svg>
  );
};

export default LinkIcon;
