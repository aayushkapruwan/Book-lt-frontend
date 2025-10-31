"use client"
import Card from "@/components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

interface Experience {
  _id: string;
  experienceName: string;
  details: string;
  location: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  const [exp, setExp] = useState<Experience[]>([]);
  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/experiences/");
      setExp(data.data);
      console.log();
      
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };
  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mx-10">
      {exp.map((item) => (
        <Card
          key={item._id}
          title={item.experienceName}
          location={item.location}
          details={item.details}
          price={item.price}
          id={item._id}
          url={item.imageUrl}
        />
      ))}
    </div>
  );
}
