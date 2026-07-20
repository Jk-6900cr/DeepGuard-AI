import {
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineServerStack,
  HiOutlineDocumentChartBar,
  HiOutlineFingerPrint,
} from "react-icons/hi2";

const TRUST_ITEMS = [
  { icon: HiOutlineLockClosed, text: "Your files remain private" },
  { icon: HiOutlineShieldCheck, text: "Files are encrypted end-to-end" },
  { icon: HiOutlineServerStack, text: "Analyzed on secure infrastructure" },
  { icon: HiOutlineDocumentChartBar, text: "Detailed AI confidence report" },
  { icon: HiOutlineFingerPrint, text: "Supports deepfake detection" },
];

export default function UploadInfoPanel() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-edge p-6">
      <h3 className="font-display text-sm font-semibold text-fog mb-4">Why you can trust this</h3>
      <ul className="flex flex-col gap-3.5">
        {TRUST_ITEMS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-xs text-mist">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-surface text-scan shrink-0">
              <Icon className="text-sm" />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}