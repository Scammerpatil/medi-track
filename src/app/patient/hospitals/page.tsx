"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Hospital {
  _id: string;
  name: string;
  address: string;
  coordinates: {
    coordinates: [0, 0];
  };
  distance: 0.0;
}

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  console.log(lat1, lon1, lat2, lon2);
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location", error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      const res = await axios.get("/api/hospital");
      let fetchedHospitals = res.data.hospitals;

      if (userLocation) {
        fetchedHospitals = fetchedHospitals.map((hospital: Hospital) => ({
          ...hospital,
          distance: getDistance(
            userLocation.lat,
            userLocation.lon,
            hospital.coordinates.coordinates[0],
            hospital.coordinates.coordinates[1]
          ),
        }));
        fetchedHospitals.sort((a: any, b: any) => a.distance - b.distance);
      }
      setHospitals(fetchedHospitals);
    };

    fetchHospitals();
  }, [userLocation]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Nearby Hospitals
      </h1>

      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md mt-6">
        <table className="table w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Distance (km)</th>
              <th>Map</th>
              <th>Doctors</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => (
                <tr
                  key={hospital._id}
                  className="text-base-content/80 text-base"
                >
                  <td>{index + 1}</td>
                  <td>{hospital.name}</td>
                  <td>{hospital.address}</td>
                  <td>{hospital.distance?.toFixed(2) || "-"}</td>
                  <td>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${hospital.coordinates.coordinates[0]},${hospital.coordinates.coordinates[1]}`}
                      target="_blank"
                    >
                      View On Map
                    </Link>
                  </td>
                  <td>
                    <a
                      href={`/patient/doctors?id=${hospital._id}`}
                      className="link link-primary no-underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-base py-4 text-base-content/50"
                >
                  No hospitals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HospitalsPage;
