import { Schema, model } from 'mongoose';
const ProfileSchema = new Schema({
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    home: { type: String, trim: true },
    airports: [String],
    avatar: String,
    color: String,
}, { collection: 'user_profiles' });
const ProfileModel = model('Profile', ProfileSchema);
function index() {
    return ProfileModel.find();
}
function get(userid) {
    return ProfileModel.find({ userid })
        .then((list) => list[0])
        .catch(() => {
        throw `${userid} Not Found`;
    });
}
function update(userid, profile) {
    return ProfileModel.findOne({ userid })
        .then((found) => {
        if (!found)
            throw `${userid} Not Found`;
        else
            return ProfileModel.findByIdAndUpdate(found._id, profile, {
                new: true,
            });
    })
        .then((updated) => {
        if (!updated)
            throw `${userid} not updated`;
        else
            return updated;
    });
}
function create(profile) {
    const p = new ProfileModel(profile);
    return p.save();
}
function remove(userid) {
    return ProfileModel.findOneAndDelete({ userid }).then((deleted) => {
        if (!deleted)
            throw `${userid} not deleted`;
    });
}
export default { index, get, create, update, remove };
