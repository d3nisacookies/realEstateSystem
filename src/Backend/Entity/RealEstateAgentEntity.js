import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import UserEntity from "./UserEntity";

class RealEstateAgentEntity extends UserEntity {
  constructor() {
    super();
  }

  async createUser(userData) {
    try {
      // Create user document in 'users' collection
      const userId = await super.createUser(userData);
      // Get the license number from userData
      const { license } = userData;
      //  Create real estate agent document in 'realEstateAgents' collection
      await setDoc(doc(db, "realEstateAgents", userId), {
        uid: userId,
        license: license,
        listedProperties: [],
        pendingProperties: [],
      });

      return userId;
    } catch (error) {
      console.error("Error creating real estate agent:", error);
      throw error;
    }
  }

  async addPendingProperty(realEstateAgentId, propertyData) {
    console.log("In real estate entity", propertyData);
    // Get the selected agent's document
    const agentDoc = await getDoc(
      doc(db, "realEstateAgents", realEstateAgentId)
    );
    const agentData = agentDoc.data();

    // If agentData.pendingProperties is not an array, initialize it as an empty array
    if (!Array.isArray(agentData.pendingProperties)) {
      agentData.pendingProperties = [];
    }

    // Add the listingData to pendingProperties
    agentData.pendingProperties.push(propertyData);

    console.log("Agent data", agentData);
    // Update the agent's document in Firestore
    await updateDoc(doc(db, "realEstateAgents", realEstateAgentId), {
      pendingProperties: agentData.pendingProperties,
    });
  }

  async getPendingProperties(realEstateAgentId) {
    // Get the selected agent's document
    const agentDoc = await getDoc(
      doc(db, "realEstateAgents", realEstateAgentId)
    );
    const agentData = agentDoc.data();

    // Return the pendingProperties
    return agentData.pendingProperties;
  }

  async addPropertyToListedProperties(realEstateAgentId, propertyId) {
    try {
      const agentRef = doc(db, "realEstateAgents", realEstateAgentId);

      // Add the property ID to the listedProperties field
      await updateDoc(agentRef, {
        listedProperties: arrayUnion(propertyId),
      });
    } catch (error) {
      console.error("Error adding property to listed properties: ", error);
      throw error;
    }
  }

  async removePropertyFromPendingProperties(realEstateAgentId, propertyId) {
    try {
      const agentRef = doc(db, "realEstateAgents", realEstateAgentId);
      const agentSnap = await getDoc(agentRef);

      if (agentSnap.exists()) {
        const agentData = agentSnap.data();
        const pendingProperties = agentData.pendingProperties || [];

        // Find the index of the property with the matching ID
        const propertyIndex = pendingProperties.findIndex(
          (property) => property.id === propertyId
        );

        if (propertyIndex !== -1) {
          // Remove the property from the array
          pendingProperties.splice(propertyIndex, 1);

          // Update the pendingProperties field with the new array
          await updateDoc(agentRef, { pendingProperties });
        }
      }
    } catch (error) {
      console.error("Error removing property from pending properties: ", error);
      throw error;
    }
  }
  // Method to update property id in pending list
  async updatePropertyId(agentId, oldPropertyId, newPropertyId) {
    try {
      console.log(
        "In update property id",
        agentId,
        oldPropertyId,
        newPropertyId
      );
      const agentRef = doc(db, "realEstateAgents", agentId);
      const agentSnap = await getDoc(agentRef);

      if (agentSnap.exists()) {
        const agentData = agentSnap.data();
        const pendingProperties = agentData.pendingProperties || [];

        // Create a new array with the updated property
        const updatedProperties = pendingProperties.map((property) => {
          if (property.id === oldPropertyId) {
            return { ...property, id: newPropertyId };
          } else {
            return property;
          }
        });

        console.log("Updated pending properties: ", updatedProperties); // Debugging line

        // Update the pendingProperties field with the new array
        await updateDoc(agentRef, { pendingProperties: updatedProperties });
      }
    } catch (error) {
      console.error("Error updating property id: ", error);
      throw error;
    }
  }
}

export default RealEstateAgentEntity;
