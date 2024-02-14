import QR from 'react-qr-code';
import classes from './index.module.css';
const QRCode = ({ value = '' }) => {
  return (
    <div className={classes.qrWrap}>
      <QR size={270} value={value} />
    </div>
  );
};

export default QRCode;
