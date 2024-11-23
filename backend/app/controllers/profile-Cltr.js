import Profile from "../models/Profile-model.js";

const profileCltr = {}

profileCltr.create = async (req, res) => {
    const body = req.body; 
    console.log('Profile data to save:', body);
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined; 
    if (avatar) body.avatar = avatar;
  
    try {
      const profile = new Profile(body);
      profile.user = req.userId;
      await profile.save();
      console.log('Created profile:', profile);

      res.status(201).json(profile); // This should include the `avatar`
    } catch (err) {
      console.error('Error creating profile:', err.message);
      res.status(500).json({ error: 'Failed to create profile. Please try again.' });
    }
  };
  profileCltr.show = async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.userId });
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile); // Include avatar in the response
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      res.status(500).json({ error: 'Failed to fetch profile.' });
    }
  };  
  

export default profileCltr
