"use client"
import { useState, useEffect } from "react";
import axios from "axios";

function MentalHealthPredictions() {
    const [accuracy, setAccuracy] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch accuracy from backend
    const fetchAccuracy = async () => {
        try {
            const response = await axios.get("https://backenddatamining-production.up.railway.app/accuracy");
            setAccuracy(response.data.accuracy);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to fetch accuracy: ${err.message}`);
            }
        }
    };

    // Fetch predictions from backend
    const fetchPredictions = async () => {
        try {
            const response = await axios.get("https://backenddatamining-production.up.railway.app/predict");
            setPredictions(response.data.predictions);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to fetch predictions: ${err.message}`);
            }
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAccuracy();
                await fetchPredictions();
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Terjai kesalahan saat mengambil data: ${err.message}`);
                }
            } finally {
                setLoading(false); // Pastikan loading berubah jadi false setelah fetch
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div className="keseluruhan">
            <div className="container-atas">
                <h1 >MENTAL HEALT PREDICTIONS</h1>
                <h2 >Model Accuracy</h2>
                <p className="akurasi">{accuracy}</p>
                <p className="female">Female : 98 orang</p>
                <p className="male">Male : 94 orang</p>
                <h2>Predictions</h2>
            </div>

            <div className="tabel">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Course</th>
                            <th>Depression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Gender === 0 ? "Female" : "Male"}</td>
                                <td>{item.Age}</td>
                                <td>{item.Course}</td>
                                <td>{item.Depression === 1 ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentalHealthPredictions;