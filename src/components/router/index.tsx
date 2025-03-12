import { Routes, Route } from 'react-router-dom';
import StartScreen from '../../pages/start-screen';
import GameScreen from '../../pages/game-screen';
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/game" element={<GameScreen />} />
        </Routes>
    );
}

export default AppRouter;
