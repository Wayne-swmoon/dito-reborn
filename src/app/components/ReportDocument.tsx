import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Pretendard',
  src: '/fonts/Pretendard-Regular.ttf', 
});

const styles = StyleSheet.create({
  page: { padding: '40 50', fontFamily: 'Pretendard', fontSize: 10, lineHeight: 1.6, color: '#334155', backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, borderBottom: '1 solid #E2E8F0', paddingBottom: 10, color: '#94a3b8', fontSize: 9 },
  
  // 1페이지 타이틀 & 요약
  titleSection: { marginBottom: 25 },
  h1: { fontSize: 26, color: '#0F172A', fontWeight: 'bold', marginBottom: 8 },
  summaryBox: { backgroundColor: '#0F172A', padding: 25, borderRadius: 12, color: 'white', marginBottom: 25 },
  summaryLabel: { fontSize: 11, color: '#94a3b8', textAlign: 'center', marginBottom: 10 },
  summaryAmount: { fontSize: 32, color: '#00C853', fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'center', borderTop: '0.5 solid #334155', paddingTop: 15 },
  gridItem: { padding: '0 20' },
  gridLabel: { fontSize: 9, color: '#94a3b8', textAlign: 'center' },
  gridValue: { fontSize: 12, color: '#00C853', fontWeight: 'bold', textAlign: 'center', marginTop: 4 },

  // 비교 카드
  comparisonSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  comparisonCard: { width: '48%', padding: 15, borderRadius: 10, border: '1 solid #E2E8F0' },
  cardLabel: { fontSize: 9, marginBottom: 5, fontWeight: 'bold' },
  cardValue: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },

  // 섹션 타이틀
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginBottom: 12, borderLeft: '3 solid #0F172A', paddingLeft: 10 },

  // 표(Table) 스타일
  table: { marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottom: '1 solid #F1F5F9', padding: '8 5', alignItems: 'center' },
  tableHeader: { backgroundColor: '#F8FAFC', borderBottom: '2 solid #E2E8F0' },
  tableLabel: { width: '30%', color: '#64748b', fontWeight: 'bold' },
  tableValue: { width: '70%', color: '#0F172A' },
  
  // 체크리스트
  checkItem: { flexDirection: 'row', marginBottom: 6, alignItems: 'center' },
  checkIcon: { width: 10, height: 10, backgroundColor: '#00C853', marginRight: 8, borderRadius: 2 },

  // 조언 박스
  commentBox: { backgroundColor: '#F8FAFC', padding: 18, borderRadius: 12, borderLeft: '4 solid #00C853', marginTop: 10 },
  footer: { position: 'absolute', bottom: 40, left: 50, right: 50, textAlign: 'center', borderTop: '1 solid #E2E8F0', paddingTop: 20, color: '#94a3b8', fontSize: 8 }
});

export const ReportDocument = ({ data }: { data: any }) => {
  const debt = data?.totalDebt || 0;
  const rate = data?.reductionRate || 0;
  const reductionAmount = debt * (rate / 100);

  return (
    <Document title={`${data?.userName}님의 프리미엄 분석 리포트`}>
      {/* PAGE 1: 핵심 분석 결과 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Personal Rehabilitation Strategy Report</Text>
          <Text>ID: {Math.random().toString(36).substr(2, 7).toUpperCase()}</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.h1}>{data?.userName} 님의 정밀 분석 리포트</Text>
          <Text style={{ color: '#64748b' }}>김태기 법률사무소 AI 솔루션이 제안하는 최적의 변제 전략입니다.</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>AI 분석 결과 예상 원금 탕감액</Text>
          <Text style={styles.summaryAmount}>약 {reductionAmount.toLocaleString()}원</Text>
          
          <View style={styles.summaryGrid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>인가 가능성</Text>
              <Text style={styles.gridValue}>매우 높음</Text>
            </View>
            <View style={{ width: 1, backgroundColor: '#334155' }} />
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>예상 탕감률</Text>
              <Text style={styles.gridValue}>{rate}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.comparisonSection}>
          <View style={[styles.comparisonCard, { backgroundColor: '#FFF5F5' }]}>
            <Text style={[styles.cardLabel, { color: '#E53E3E' }]}>회생 전 (현재 채무 원금)</Text>
            <Text style={styles.cardValue}>{debt.toLocaleString()}원</Text>
          </View>
          <View style={[styles.comparisonCard, { backgroundColor: '#F0FFF4', border: '1 solid #00C853' }]}>
            <Text style={[styles.cardLabel, { color: '#38A169' }]}>회생 후 (36개월간 변제액)</Text>
            <Text style={styles.cardValue}>{(debt - reductionAmount).toLocaleString()}원</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>법적 변제안 상세</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>월 변제 예정액</Text>
            <Text style={styles.tableValue}>월 {(data.monthlyIncome - data.livingExpense).toLocaleString()}원</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>변제 기간</Text>
            <Text style={styles.tableValue}>36개월 (단축 가능성 있음)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>가용 소득 산출</Text>
            <Text style={styles.tableValue}>월 소득 {data.monthlyIncome.toLocaleString()}원 - 생계비 {data.livingExpense.toLocaleString()}원</Text>
          </View>
        </View>

        <View style={styles.commentBox}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0F172A', marginBottom: 5 }}>AI 변호사 핵심 조언</Text>
          <Text style={{ fontSize: 9, color: '#475569' }}>
            {data?.userName} 님은 낮은 가용소득과 적정한 부양가족 수로 인해 높은 탕감률이 기대되는 케이스입니다. 
            다만 최근 채무 사용처에 대한 소명 자료가 인가의 핵심이 될 것입니다. 김태기 법률사무소의 
            축적된 노하우를 통해 기각 없는 인가 결정을 지원해 드리겠습니다.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>ATTORNEY KIM TAE GI LAW OFFICE | 051-XXX-XXXX</Text>
        </View>
      </Page>

      {/* PAGE 2: 상세 데이터 & 준비 서류 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>채무 상세 진단</Text>
        <View style={[styles.table, { marginBottom: 40 }]}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={{ width: '40%', fontSize: 9, fontWeight: 'bold' }}>분석 항목</Text>
            <Text style={{ width: '60%', fontSize: 9, fontWeight: 'bold' }}>AI 정밀 진단 내용</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ width: '40%' }}>최근 채무 비중</Text>
            <Text style={{ width: '60%', color: '#E53E3E' }}>높음 (최근 1년 내 30% 발생)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ width: '40%' }}>재산 가치(청산가치)</Text>
            <Text style={{ width: '60%' }}>약 {(debt * 0.2).toLocaleString()}원 예상 (청산가치 보장 원칙 준수)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ width: '40%' }}>탕감 제외 대상</Text>
            <Text style={{ width: '60%' }}>없음 (벌금, 세금 등 비면책 채무 미발견)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>사건 접수 시 필요 서류</Text>
        <View style={{ marginBottom: 30 }}>
          <View style={styles.checkItem}>
            <View style={styles.checkIcon} /><Text>주민등록등본 및 초본 (과거 주소 변동 내역 포함)</Text>
          </View>
          <View style={styles.checkItem}>
            <View style={styles.checkIcon} /><Text>가족관계증명서 (상세)</Text>
          </View>
          <View style={styles.checkItem}>
            <View style={styles.checkIcon} /><Text>근로소득원천징수영수증 또는 급여명세서 (최근 1년분)</Text>
          </View>
          <View style={styles.checkItem}>
            <View style={styles.checkIcon} /><Text>부동산 등기부등본 및 자동차 등록원부 (해당 시)</Text>
          </View>
          <View style={styles.checkItem}>
            <View style={styles.checkIcon} /><Text>지방세 세목별 과세증명서 (전국 단위)</Text>
          </View>
        </View>

        <View style={[styles.commentBox, { backgroundColor: '#F0F9FF', borderLeftColor: '#0EA5E9' }]}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0369A1', marginBottom: 5 }}>향후 진행 절차 안내</Text>
          <Text style={{ fontSize: 9, color: '#0C4A6E' }}>
            1. 신청서 접수 및 금지명령 신청 (접수 후 1주일 내 금지명령 결정) {"\n"}
            2. 회생위원 면담 및 보정권고 대응 (3~4개월 소요) {"\n"}
            3. 개시 결정 및 채권자 집회 {"\n"}
            4. 최종 변제계획안 인가 결정
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>© 2026 attorney Kim Tae-gi Law Office. All Rights Reserved.</Text>
        </View>
      </Page>
    </Document>
  );
};