const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const disk = require("multer/storage/disk");
const { diskStorage } = require("multer");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = require.file.filename;

    const user = await knex("users")
    .where({ id: user_id}).first();

    if(!user) {
      throw new AppError("Somentes usuários autenticados podem mudar o avatar", 401);
    }

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    await knex("users").update(user);

    return response.json(User);
  }
}

module.exports = UserAvatarController;