import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() => import("./"));
const MoviesPage = lazy(() => import("./"));
const MovieDetailsPage = lazy(() => import("./"));
const MovieCast = lazy(() => import("./"));
const MovieReviews = lazy(() => import("./"));
const NotFoundPage = lazy(() => import("./"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
