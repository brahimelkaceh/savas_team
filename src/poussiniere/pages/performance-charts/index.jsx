import Navbar from "../../components/navbar/Navbar";
import Container from "../../sections/performance/charts/Container";

const PerformanceCharts = () => {
  return (
    <main className="page">
      <Navbar />
      <div
        className="
      charts-container"
      >
        <Container />
      </div>
    </main>
  );
};

export default PerformanceCharts;
