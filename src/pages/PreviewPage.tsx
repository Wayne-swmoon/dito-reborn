import { useLocation } from "react-router-dom"; // 추가
import { PDFViewer } from "@react-pdf/renderer";
import { ReportDocument } from "../app/components/ReportDocument";

export default function PreviewPage() {
  const location = useLocation();
  
  // 넘겨받은 데이터가 있으면 그걸 쓰고, 없으면 기존 더미 데이터를 써!
  const realData = location.state?.reportData || {
    userName: "세권",
    reductionRate: 78,
    totalDebt: 85000000,
    totalInterest: 12000000,
    monthlyIncome: 2500000,
    livingExpense: 1200000,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '15px', background: '#0F172A', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '16px' }}>{realData.userName}님의 맞춤형 분석 보고서</h1>
      </header>
      
      <div style={{ flex: 1 }}>
        <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
          <ReportDocument data={realData} />
        </PDFViewer>
      </div>
    </div>
  );
}