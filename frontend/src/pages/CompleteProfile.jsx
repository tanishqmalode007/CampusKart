import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

function CompleteProfile() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [mobile, setMobile] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (
      !mobile ||
      !college ||
      !department ||
      !year
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        mobile,
        college,
        department,
        year,
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Complete Your Profile</h1>

        <p>
          Complete your CampusKart profile to continue.
        </p>

        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="College Name"
          value={college}
          onChange={(e) =>
            setCollege(e.target.value)
          }
        />

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        >
          <option value="">
            Select Department
          </option>

          <option>Information Technology (IT)</option>
          <option>Computer Engineering</option>
          <option>Mechanical Engineering</option>
          <option>ENTC</option>
          <option>Artificial Intelligence & Data Science (AI & DS)</option>
        </select>

        <select
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
        >
          <option value="">
            Select Year
          </option>

          <option>First Year (FE)</option>
          <option>Second Year (SE)</option>
          <option>Third Year (TE)</option>
          <option>Final Year (BE)</option>
        </select>

        <button
          className="create-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save & Continue"}
        </button>

      </div>
    </div>
  );
}

export default CompleteProfile;