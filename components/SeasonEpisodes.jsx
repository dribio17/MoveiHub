// components/SeasonEpisodes.jsx
'use client';

import { useEffect, useState } from 'react';
import { getSeasons, getImageUrl } from '@/lib/tmdb';
import { PlayCircle } from 'lucide-react';

export default function SeasonEpisodes({ tvId, numberOfSeasons, onPlay }) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSeasonChange = (e) => {
    setSelectedSeason(Number(e.target.value));
  };

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSeasons(tvId, selectedSeason);
        setSeasonData(data);
      } catch (err) {
        console.error(err);
        setError('Error loading the episodes.');
      } finally {
        setLoading(false);
      }
    };

    if (tvId) {
      fetchSeason();
    }
  }, [tvId, selectedSeason]);

  return (
    <div className="mt-10 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-gray-300 font-medium">
          Season:
        </label>
        <select
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2"
        >
          {Array.from({ length: numberOfSeasons }, (_, i) => i + 1).map((season) => (
            <option key={season} value={season}>
              Season {season}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-gray-400">Loading episodes...</p>
      )}
      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {seasonData && seasonData.episodes && (
        <div className="space-y-3">
          {seasonData.episodes.map((episode) => (
            <div
              key={episode.id}
              onClick={() => onPlay && onPlay(episode, selectedSeason)}
              className="flex gap-4 bg-gray-900/60 border border-gray-800 rounded-lg p-3 hover:bg-gray-900 transition cursor-pointer"
            >
              <div className="w-32 h-20 flex-shrink-0 relative overflow-hidden rounded-md bg-gray-800">
                {episode.still_path ? (
                  <img
                    src={getImageUrl(episode.still_path, 'w300')}
                    alt={episode.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-300 font-semibold">
                      S{episode.season_number} · E{episode.episode_number}
                    </p>
                    <h4 className="text-white font-semibold">
                      {episode.name}
                    </h4>
                  </div>
                  {episode.vote_average > 0 && (
                    <span className="text-sm text-yellow-300">
                      {episode.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                {episode.overview && (
                  <p className="mt-1 text-sm text-gray-400 line-clamp-3">
                    {episode.overview}
                  </p>
                )}
                {episode.air_date && (
                  <p className="mt-1 text-xs text-gray-500">
                    Air date: {episode.air_date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
