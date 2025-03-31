import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';

const Home = () => {
  const [user, setUser] = useState(null);
  const rawUserId = localStorage.getItem("userID");
  const userId = rawUserId.replace(/^"|"$/g, '');
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Erreur lors de la récupération :', error));
  }, [userId]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      {/* <h2>Détails de l'utilisateur</h2>
      <p><strong>Prénom :</strong> {user.firstname}</p>
      <p><strong>Nom :</strong> {user.lastname}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Téléphone :</strong> {user.telephone}</p>
      <p><strong>Nom d'utilisateur :</strong> {user.surname}</p>
      <p><strong>Date de naissance :</strong> {new Date(user.birthDate).toLocaleDateString()}</p> */}
      <Navigation/>
    </div>
  );
};

export default Home;