import { useRouter } from "next/router";

const GameDashboard = () => {
  const router = useRouter();
  const { code } = router.query;
};

export default GameDashboard;
