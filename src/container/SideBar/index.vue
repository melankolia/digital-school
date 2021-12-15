<template>
  <v-navigation-drawer
    style="overflow: visible !important"
    app
    permanent
    :mini-variant.sync="mini"
    width="308px"
    mini-variant-width="104px"
  >
    <div
      style="height: 100%"
      class="d-flex flex-column justify-space-between pb-10"
    >
      <div>
        <v-list>
          <v-list-item
            style="transition: all 0.7s"
            :class="{ 'px-2 pt-4': mini, 'pl-10 pt-4': !mini }"
          >
            <v-list-item-avatar>
              <v-img src="@/assets/image/smansa.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <p class="smansa-title ma-0">Smansa</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list
          style="transition: all 0.7s"
          :class="{ 'mx-5': !mini, 'mx-4': mini }"
          nav
        >
          <v-list-group
            v-model="item.active"
            v-for="(item, i) in items"
            :key="'a' + i"
            :active-class="'primary white--text'"
            style="transition: all 0.7s"
          >
            <template v-slot:activator>
              <v-list-item-action
                :class="{ 'mr-4': !mini }"
                class="d-flex flex-row justify-center align-center"
              >
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <p class="ma-0 item-style">{{ item.title }}</p>
              </v-list-item-content>
            </template>
            <v-list-item
              v-show="!mini"
              style="transition: all 0.7s"
              v-for="(subItem, si) in item.subItems"
              :key="'b' + si"
              :to="subItem.to"
              :active-class="'subMenu black--text'"
            >
              <v-list-item-action
                :class="{ 'mr-4': !mini }"
                class="d-flex flex-row justify-center align-center"
              >
              </v-list-item-action>
              <v-list-item-content>
                <p class="ma-0 item-style">{{ subItem.title }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
      <v-list
        style="transition: all 0.7s"
        :class="{ 'mx-5': !mini, 'mx-4': mini }"
        nav
      >
        <!-- <v-list-item to="/about" :active-class="'primary white--text'">
          <v-list-item-action
            :class="{ 'mr-4': !mini }"
            class="d-flex flex-row justify-center align-center"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <p class="ma-0 item-style">Pengaturan</p>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item @click="handleLogout" style="color: #ff5252 !important">
          <v-list-item-action
            :class="{ 'mr-4': !mini }"
            class="d-flex flex-row justify-center align-center"
          >
            <v-icon color="error" small>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <p class="ma-0 item-style">Logout</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-btn
      elevation="4"
      class="fab-toggle white"
      x-small
      fab
      icon
      @click.stop="mini = !mini"
    >
      <v-icon>{{
        mini ? "mdi-chevron-double-right" : "mdi-chevron-double-left"
      }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
import { FORCE_LOGOUT } from "@/store/constants/actions.type";
import { SISWA, ALUMNI, GURU, TENAGA_AHLI } from "@/router/name.types";

export default {
  data() {
    return {
      mini: true,
      items: [
        {
          icon: "mdi-school-outline",
          title: "Siswa",
          subItems: [
            {
              title: "Kelas",
              to: { name: SISWA.KELAS.BROWSE },
            },
            {
              title: "Seluruh Siswa",
              to: "/siswa",
            },
            {
              title: "Rekapitulasi Siswa",
              to: "/rekapitulasi",
            },
          ],
          active: true,
        },
        {
          icon: "mdi-book-open-variant",
          title: "Guru",
          subItems: [
            {
              title: "Seluruh Guru",
              to: { name: GURU.BROWSE },
            },
          ],
          active: false,
        },
        {
          icon: "mdi-account-multiple-outline",
          title: "Tenaga Kependidikan",
          subItems: [
            {
              title: "Seluruh Tenaga Kependidikan",
              to: { name: TENAGA_AHLI.BROWSE },
            },
          ],
          active: false,
        },
        {
          icon: "mdi-library",
          title: "Alumni",
          subItems: [
            {
              title: "Seluruh Alumni Siswa",
              to: { name: ALUMNI.ALL.BROWSE },
            },
          ],
          active: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions([FORCE_LOGOUT]),
    handleLogout() {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to logout ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this[FORCE_LOGOUT]()
              .then(() => {
                this.$router.push({ name: "login" });
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message: "Logout Berhasil",
                  color: "success",
                });
              })
              .catch((err) => console.log(err));
          }
        },
      });
    },
    handleMini() {
      this.mini = !this.mini;
      if (this.mini) this.items.map((item) => (item.active = false));
    },
  },
  watch: {
    mini(val) {
      this.$emit("handlerMini", val);
    },
  },
};
</script>

<style scoped>
.smansa-title {
  font-size: 24px;
  font-weight: 600;
  color: #a0a3bd;
}

.fab-toggle {
  position: absolute;
  right: -14px;
  bottom: 56px;
}

.item-style {
  font-family: "Poppins";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;

  /* color: #898989; */
}
</style>
