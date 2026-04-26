import "./style.css";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findStoreLazy } from "@webpack";
import { Forms, Text } from "@webpack/common";

import { nitroBronze, nitroSilver, nitroGold, nitroPlatinum, nitroDiamond, nitroEmerald, nitroRuby, nitroOpal } from "./nitroIcons";

const AVAILABLE_BADGES = [
  { id: "staff", name: "Discord Staff" },
  { id: "partner", name: "Partnered Server Owner" },
  { id: "certified_moderator", name: "Moderator Programs Alumni" },
  { id: "hypesquad", name: "HypeSquad Events" },
  { id: "bug_hunter_level_1", name: "Bug Hunter Level 1" },
  { id: "bug_hunter_level_2", name: "Bug Hunter Level 2" },
  { id: "active_developer", name: "Active Developer" },
  { id: "early_supporter", name: "Early Supporter" },
  { id: "premium", name: "Nitro" },
  { id: "verified_developer", name: "Early Verified Bot Developer" },
  { id: "guild_booster_lvl1", name: "Server Boost 1 Month" },
  { id: "guild_booster_lvl2", name: "Server Boost 2 Months" },
  { id: "guild_booster_lvl3", name: "Server Boost 3 Months" },
  { id: "guild_booster_lvl4", name: "Server Boost 6 Months" },
  { id: "guild_booster_lvl5", name: "Server Boost 9 Months" },
  { id: "guild_booster_lvl6", name: "Server Boost 12 Months" },
  { id: "guild_booster_lvl7", name: "Server Boost 15 Months" },
  { id: "guild_booster_lvl8", name: "Server Boost 18 Months" },
  { id: "guild_booster_lvl9", name: "Server Boost 24 Months" },
  { id: "hypesquad_online_house_1", name: "HypeSquad Bravery" },
  { id: "hypesquad_online_house_2", name: "HypeSquad Brilliance" },
  { id: "hypesquad_online_house_3", name: "HypeSquad Balance" },
  { id: "automod", name: "Uses AutoMod" },
  { id: "quest", name: "Quest Completed" },
  { id: "bot_commands", name: "Supports Commands" },
  { id: "application_premium", name: "Premium Bot" },
  { id: "premium_tenure_1_month_v2", name: "Nitro Bronze (1 Month)" },
  { id: "premium_tenure_3_month_v2", name: "Nitro Silver (3 Months)" },
  { id: "premium_tenure_6_month_v2", name: "Nitro Gold (6 Months)" },
  { id: "premium_tenure_12_month_v2", name: "Nitro Platinum (12 Months)" },
  { id: "premium_tenure_24_month_v2", name: "Nitro Diamond (24 Months)" },
  { id: "premium_tenure_36_month_v2", name: "Nitro Emerald (36 Months)" },
  { id: "premium_tenure_60_month_v2", name: "Nitro Ruby (60 Months)" },
  { id: "premium_tenure_72_month_v2", name: "Nitro Opal (72+ Months)" },
];

const UserStore = findStoreLazy("UserStore");
const UserProfileStore = findStoreLazy("UserProfileStore");

function BadgeSelector() {
  const { selectedBadges } = settings.use(["selectedBadges"]);
  const selected = (selectedBadges || []) as string[];

  const toggleBadge = (id: string) => {
    try {
      const newSelected = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
      settings.store.selectedBadges = newSelected;
    } catch (e) {
      console.error("Error toggling badge:", e);
    }
  };

  const getBadgeIconUrl = (badgeId: string) => {
    if (NITRO_BADGE_IMAGES[badgeId]) {
      return NITRO_BADGE_IMAGES[badgeId];
    }
    
    const iconHash = BADGE_ICON_HASHES[badgeId];
    if (!iconHash) return null;
    return `https://cdn.discordapp.com/badge-icons/${iconHash}.png`;
  };

  return (
    <div>
      <Forms.FormTitle tag="h3">Selecione suas badges</Forms.FormTitle>
      <Text color="text-muted" style={{ marginBottom: "15px" }}>
        Clique nas badges que você quer exibir no seu perfil. {selected.length > 0 && `(${selected.length} selecionada${selected.length > 1 ? 's' : ''})`}
      </Text>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "10px" }}>
        {AVAILABLE_BADGES.map((badge) => {
          try {
            const isSelected = selected.includes(badge.id);
            const iconUrl = getBadgeIconUrl(badge.id);
            
            return (
              <div
                key={badge.id}
                onClick={() => toggleBadge(badge.id)}
                style={{
                  cursor: "pointer",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  background: isSelected ? "var(--brand-experiment)" : "var(--background-secondary)",
                  border: isSelected ? "2px solid var(--brand-experiment-560)" : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 2px 8px rgba(88, 101, 242, 0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "var(--background-modifier-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "var(--background-secondary)";
                  }
                }}
              >
                {iconUrl ? (
                  <img 
                    src={iconUrl} 
                    alt={badge.name}
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: 0,
                      filter: isSelected ? "none" : "grayscale(50%)",
                      opacity: isSelected ? 1 : 0.7,
                      transition: "all 0.15s ease"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: isSelected ? "white" : "var(--text-muted)",
                    flexShrink: 0
                  }} />
                )}
                <Text
                  variant="text-sm/semibold"
                  style={{
                    color: isSelected ? "white" : "var(--text-normal)",
                    flex: 1,
                    fontSize: "14px"
                  }}
                >
                  {badge.name}
                </Text>
                {isSelected && (
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="var(--brand-experiment)" />
                    </svg>
                  </div>
                )}
              </div>
            );
          } catch (e) {
            console.error("Error rendering badge:", badge.id, e);
            return null;
          }
        })}
      </div>
    </div>
  );
}

const settings = definePluginSettings({
  hideRealBadges: {
    type: OptionType.BOOLEAN,
    description: "Remove suas badges reais do Discord e mostra apenas as selecionadas abaixo",
    default: false,
  },
  customUsername: {
    type: OptionType.STRING,
    description: "Nome de usuário customizado (deixe vazio para usar o original)",
    default: "",
  },
  customCreatedAt: {
    type: OptionType.STRING,
    description: "Data de criação da conta customizada (formato: YYYY-MM-DD, deixe vazio para usar a original)",
    default: "",
    placeholder: "2015-05-13",
  },
  premiumSince: {
    type: OptionType.STRING,
    description: "Data de início da assinatura Nitro (formato: YYYY-MM-DD, deixe vazio para usar a original)",
    default: "",
    placeholder: "2020-01-15",
  },
  premiumGuildSince: {
    type: OptionType.STRING,
    description: "Data de início do boost no servidor (formato: YYYY-MM-DD, deixe vazio para usar a original)",
    default: "",
    placeholder: "2021-06-20",
  },
  selectedBadges: {
    type: OptionType.COMPONENT,
    component: BadgeSelector,
    default: [] as string[],
  },
});

const BADGE_ICON_HASHES: Record<string, string> = {
  "staff": "5e74e9b61934fc1f67c65515d1f7e60d",
  "partner": "3f9748e53446a137a052f3454e2de41e",
  "certified_moderator": "fee1624003e2fee35cb398e125dc479b",
  "hypesquad": "bf01d1073931f921909045f3a39fd264",
  "bug_hunter_level_1": "2717692c7dca7289b35297368a940dd0",
  "bug_hunter_level_2": "848f79194d4be5ff5f81505cbd0ce1e6",
  "active_developer": "6bdc42827a38498929a4920da12695d9",
  "early_supporter": "7060786766c9c840eb3019e725d2b358",
  "premium": "2ba85e8026a8614b640c2837bcdfe21b",
  "verified_developer": "6df5892e0f35b051f8b61eace34f4967",
  "hypesquad_online_house_1": "8a88d63823d8a71cd5e390baa45efa02",
  "hypesquad_online_house_2": "011940fd013da3f7fb926e4a1cd2e618",
  "hypesquad_online_house_3": "3aa41de486fa12454c3761e8e223442e",
  "hypesquad_balance_golden": "3aa41de486fa12454c3761e8e223442e",
  "hypesquad_balance_koth": "3aa41de486fa12454c3761e8e223442e",
  "automod": "f2459b691ac7453ed6039bbcfaccbfcd",
  "quest": "7d9ae358c8c5e118768335dbe68b4fb8",
  "bot_commands": "6f9e37f9029ff57aef81db857890005e",
  "application_premium": "2ba85e8026a8614b640c2837bcdfe21b",
  "legacy_username": "6de6d34650760ba5551a79732e98ed60",
  "guild_role_subscription": "d2010c413a8da2208b7e4f35bd8cd4ac",
  "guild_booster_lvl1": "51040c70d4f20a921ad6674ff86fc95c",
  "guild_booster_lvl2": "0e4080d1d333bc7ad29ef6528b6f2fb7",
  "guild_booster_lvl3": "72bed924410c304dbe3d00a6e593ff59",
  "guild_booster_lvl4": "df199d2050d3ed4ebf84d64ae83989f8",
  "guild_booster_lvl5": "996b3e870e8a22ce519b3a50e6bdd52f",
  "guild_booster_lvl6": "991c9f39ee33d7537d9f408c3e53141e",
  "guild_booster_lvl7": "cb3ae83c15e970e8f3d410bc62cb8b99",
  "guild_booster_lvl8": "7142225d31238f6387d9f09efaa02759",
  "guild_booster_lvl9": "ec92202290b48d0879b7413d2dde3bab",
  "premium_tenure_1_month_v2": "4f33c4a9c64ce221936bd256c356f91f",
  "premium_tenure_3_month_v2": "4514fab914bdbfb4ad2fa23df76121a6",
  "premium_tenure_6_month_v2": "2895086c18d5531d499862e41d1155a6",
  "premium_tenure_12_month_v2": "0334688279c8359120922938dcb1d6f8",
  "premium_tenure_24_month_v2": "0d61871f72bb9a33a7ae568c1fb4f20a",
  "premium_tenure_36_month_v2": "11e2d339068b55d3a506cff34d3780f3",
  "premium_tenure_60_month_v2": "cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4",
  "premium_tenure_72_month_v2": "5b154df19c53dce2af92c9b61e6be5e2",
};

const NITRO_BADGE_IMAGES: Record<string, string> = {
  "premium_tenure_1_month_v2": nitroBronze,
  "premium_tenure_3_month_v2": nitroSilver,
  "premium_tenure_6_month_v2": nitroGold,
  "premium_tenure_12_month_v2": nitroPlatinum,
  "premium_tenure_24_month_v2": nitroDiamond,
  "premium_tenure_36_month_v2": nitroEmerald,
  "premium_tenure_60_month_v2": nitroRuby,
  "premium_tenure_72_month_v2": nitroOpal,
};

export default definePlugin({
  name: "NogBadgesV2",
  description: "Adiciona badges customizadas ao seu perfil do Discord",
  authors: [{ name: "Nog", id: 296656213033353228n }],
  settings,

  start() {
    try {
      if (!UserProfileStore?.getUserProfile) {
        console.error("[NogBadges] UserProfileStore não encontrado");
        return;
      }

      const originalGetUserProfile = UserProfileStore.getUserProfile.bind(UserProfileStore);
      
      let originalGetCurrentUser: any = null;
      if (UserStore?.getCurrentUser) {
        originalGetCurrentUser = UserStore.getCurrentUser.bind(UserStore);
        UserStore.getCurrentUser = function() {
          const user = originalGetCurrentUser();
          if (user && settings.store.customUsername && settings.store.customUsername.trim() !== "") {
            const customName = settings.store.customUsername.trim();
            Object.defineProperty(user, 'username', {
              get: () => customName,
              configurable: true,
              enumerable: true
            });
          }
          return user;
        };
      }
      
      UserProfileStore.getUserProfile = function (userId: string, ...args: any[]) {
        const profile = originalGetUserProfile(userId, ...args);
        
        try {
          if (!profile) {
            return profile;
          }

          if (!profile.badges) {
            profile.badges = [];
          }

          const currentUser = UserStore?.getCurrentUser?.();
          const isCurrentUser = currentUser && userId === currentUser.id;

          const selectedIds = settings.store.selectedBadges || [];
          
          if (isCurrentUser && Array.isArray(selectedIds) && (selectedIds.length > 0 || settings.store.hideRealBadges)) {
            const realBadges = settings.store.hideRealBadges ? [] : [...profile.badges];
            
            const customBadges = selectedIds
              .map(id => {
                const badgeDef = AVAILABLE_BADGES.find(b => b.id === id);
                if (!badgeDef) return null;

                const iconHash = BADGE_ICON_HASHES[id];
                
                if (!iconHash) {
                  console.warn(`[NogBadges] Sem icon hash para badge: ${id}`);
                  return null;
                }

                return {
                  id: badgeDef.id,
                  description: badgeDef.name,
                  icon: iconHash,
                  link: "https://discord.com"
                };
              })
              .filter(Boolean);

            profile.badges = [...customBadges];
            
            if (!settings.store.hideRealBadges) {
              realBadges.forEach(realBadge => {
                if (!profile.badges.some((b: any) => b.id === realBadge.id)) {
                  profile.badges.push(realBadge);
                }
              });
            }
          }

          if (isCurrentUser && settings.store.customUsername && settings.store.customUsername.trim() !== "") {
            const customName = settings.store.customUsername.trim();
            
            if (profile.user) {
              profile.user.username = customName;
            }
            if (profile.userProfile) {
              profile.userProfile.username = customName;
            }
            if (profile.username !== undefined) {
              profile.username = customName;
            }
          }

          if (isCurrentUser && settings.store.customCreatedAt && settings.store.customCreatedAt.trim() !== "") {
            try {
              const customDate = new Date(settings.store.customCreatedAt.trim());
              if (!isNaN(customDate.getTime())) {
                const timestamp = customDate.getTime();
                const discordEpoch = 1420070400000;
                const customSnowflake = String((timestamp - discordEpoch) << 22);
                
                if (profile.user) {
                  profile.user.id = customSnowflake;
                  profile.user.createdAt = customDate;
                }
                if (profile.userProfile) {
                  profile.userProfile.userId = customSnowflake;
                }
              }
            } catch (e) {
              console.error("[NogBadges] Erro ao processar data customizada:", e);
            }
          }

          if (isCurrentUser && settings.store.premiumSince && settings.store.premiumSince.trim() !== "") {
            try {
              const premiumDate = new Date(settings.store.premiumSince.trim() + "T00:00:00.000Z");
              if (!isNaN(premiumDate.getTime())) {
                const premiumDateISO = premiumDate.toISOString();
                
                if (profile.userProfile) {
                  profile.userProfile.premiumSince = premiumDateISO;
                  profile.userProfile.premium_since = premiumDateISO;
                }
                if (profile.premiumSince !== undefined) {
                  profile.premiumSince = premiumDateISO;
                }
                if (profile.premium_since !== undefined) {
                  profile.premium_since = premiumDateISO;
                }
                
                if (profile.user) {
                  profile.user.premiumSince = premiumDateISO;
                  profile.user.premium_since = premiumDateISO;
                }
                
                if (profile.badges) {
                  profile.badges.forEach((badge: any) => {
                    if (badge.id && badge.id.startsWith('premium_tenure_')) {
                      const formattedDate = premiumDate.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      });
                      badge.description = `Assinante desde ${formattedDate}`;
                    }
                  });
                }
              } else {
                console.warn("[NogBadges] Data do Nitro inválida:", settings.store.premiumSince);
              }
            } catch (e) {
              console.error("[NogBadges] Erro ao processar data do Nitro:", e);
            }
          }

          if (isCurrentUser && settings.store.premiumGuildSince && settings.store.premiumGuildSince.trim() !== "") {
            try {
              const boostDate = new Date(settings.store.premiumGuildSince.trim() + "T00:00:00.000Z");
              if (!isNaN(boostDate.getTime())) {
                const boostDateISO = boostDate.toISOString();
                
                if (profile.userProfile) {
                  profile.userProfile.premiumGuildSince = boostDateISO;
                  profile.userProfile.premium_guild_since = boostDateISO;
                }
                if (profile.premiumGuildSince !== undefined) {
                  profile.premiumGuildSince = boostDateISO;
                }
                if (profile.premium_guild_since !== undefined) {
                  profile.premium_guild_since = boostDateISO;
                }
                
                if (profile.user) {
                  profile.user.premiumGuildSince = boostDateISO;
                  profile.user.premium_guild_since = boostDateISO;
                }
                
                if (profile.badges) {
                  profile.badges.forEach((badge: any) => {
                    if (badge.id && badge.id.startsWith('guild_booster_')) {
                      const formattedDate = boostDate.toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });
                      badge.description = `Impulsionando o servidor desde ${formattedDate}`;
                    }
                  });
                }
              } else {
                console.warn("[NogBadges] Data do boost inválida:", settings.store.premiumGuildSince);
              }
            } catch (e) {
              console.error("[NogBadges] Erro ao processar data do boost:", e);
            }
          }

        } catch (e) {
          console.error("[NogBadges] Erro ao modificar perfil:", e);
        }

        return profile;
      };

      (this as any).restoreGetUserProfile = () => {
        UserProfileStore.getUserProfile = originalGetUserProfile;
        if (originalGetCurrentUser) {
          UserStore.getCurrentUser = originalGetCurrentUser;
        }
      };

      console.log("[NogBadges] Plugin iniciado com sucesso!");
    } catch (e) {
      console.error("[NogBadges] Erro ao iniciar plugin:", e);
    }
  },

  stop() {
    try {
      if ((this as any).restoreGetUserProfile) {
        (this as any).restoreGetUserProfile();
        (this as any).restoreGetUserProfile = null;
      }
      console.log("[NogBadges] Plugin parado com sucesso!");
    } catch (e) {
      console.error("[NogBadges] Erro ao parar plugin:", e);
    }
  },
});
