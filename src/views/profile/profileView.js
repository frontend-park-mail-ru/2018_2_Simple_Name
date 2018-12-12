import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import ProfileService from "../../services/ProfileService.js";
import profileTemplate from './profileTemplate.pug';


export default class profileView extends BaseView {
    constructor(el) {
        super(el);
        this.userData = null;

        bus.on("profile-get-data", async () => {
            this.userData = await ProfileService.GetUserData();
            this.renderProfile();
        });

        bus.on("profile-send-avatar", async () => {
            const form = document.getElementById('profileForm');

            const changeAvatar = form.elements.newavatar.value !== "";

            if (changeAvatar) {
                const avatarformData = new FormData();
                avatarformData.append("new_avatar", form.elements.newavatar.files[0], "new_avatar");
                await ProfileService.SendUserAvatar(avatarformData);
            }

        });

        bus.on("profile-send-data", async () => {

            const form = document.getElementById('profileForm');

            const newPassword = form.elements.newpassword.value;
            const repeatNewPassword = form.elements.repeatnewpassword.value;

            if (newPassword !== repeatNewPassword) {
                // alert("Пароли отличаются.");
                const errText = 'Passwordi otlichautsya';
                inner.innerHTML = profileTemplate({statusText: errText});
                return;
            }

            const JSONdata = {
                password: newPassword
            };

            // Смена пароля пользователем
            const changePassword = newPassword !== "";

            if (changePassword) {
                const result = await ProfileService.PutUserData(JSONdata);
                return result;
            }
        });

        bus.on("logout", async () => {
            await ProfileService.Logout();
        });
    }

    renderProfile() {
        this.el.innerHTML = profileTemplate({
            playerNickname: this.userData.nick,
            playerEmail: this.userData.email,
            playerScore: this.userData.score
        });

        const changes = document.getElementById("profileSave");
        const logout = document.getElementById("logout");

        changes.addEventListener("click", (event) => {
            event.preventDefault();
            bus.emit("profile-send-data");
            bus.emit("profile-send-avatar");
        });

        logout.addEventListener("click", (event) => {
            event.preventDefault();
            bus.emit("logout");
        });
    }

    render() {
        this.el.innerHTML = '';
        bus.emit("profile-get-data");
    }

}