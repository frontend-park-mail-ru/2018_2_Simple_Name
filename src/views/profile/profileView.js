import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import ProfileService from "../../services/ProfileService.js";


export default class profileView extends BaseView {
    constructor(el){
        super(el);
        this.userData = null;

        bus.on("profile-get-data", async function () {
            this.userData = await ProfileService.GetUserData();
            this.renderProfile();
        }.bind(this));

        bus.on("profile-send-avatar", async function () {
            const form = document.getElementById('profileForm');

            const changeAvatar = form.elements.newavatar.value !== "";

            if (changeAvatar) {
                const avatarformData = new FormData();
                avatarformData.append("new_avatar", form.elements.newavatar.files[0], "new_avatar");
                await ProfileService.SendUserAvatar(avatarformData);
            }

        }.bind(this));

        bus.on("profile-send-data", async function () {

            const form = document.getElementById('profileForm');

            const newPassword = form.elements.newpassword.value;
            const repeatNewPassword = form.elements.repeatnewpassword.value;

            if (newPassword !== repeatNewPassword) {
                alert("Пароли отличаются.");
                return
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
        }.bind(this));

        bus.on("logout", async function () {
            await ProfileService.Logout();
        }.bind(this));
    }

    renderProfile(){
        console.log(this.userData.nick);
        console.log(this.userData.email);
        console.log(this.userData.score);
        this.el.innerHTML = window.profiletemplateTemplate({
            playerNickname: this.userData.nick,
            playerEmail: this.userData.email,
            playerScore: this.userData.score
        });

        const changes = document.getElementById("profileSave");
        const logout = document.getElementById("logout");

        changes.addEventListener("click", function (event) {
            event.preventDefault();
            bus.emit("profile-send-data");
            bus.emit("profile-send-avatar");
        });

        logout.addEventListener("click", function (event) {
            event.preventDefault();
            bus.emit("logout");
        });
    }

    render () {
        this.el.innerHTML = '';
        bus.emit("profile-get-data");
        // const profileSection = document.createElement('section');
        // profileSection.dataset.sectionName = 'profile';

        // this.section = profileSection;

        // this.section.innerHTML = signinHtml
    }

}