import { useAppContext } from "@/context/AppContext";

// Inside the component
const { season } = useAppContext();

useEffect(() => {
  fetch(`/api/players?season=${season}`)
    .then((res) => res.json())
    .then((data) => {
      setPlayers(data);
      setFiltered(data);
    });
}, [season]);
