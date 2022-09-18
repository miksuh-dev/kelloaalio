import {
  APPLICATION_COMMAND_TYPE,
  APPLICATION_COMMAND_OPTION_TYPE,
  CHANNEL_TYPE,
  MESSAGE_ACTIVITY_TYPE,
  MESSAGE_TYPE,
  INTERACTION_TYPE,
  INTERACTION_RESPONSE_TYPE,
  MESSAGE_COMPONENT_TYPE,
  BUTTON_STYLE,
  TEXT_INPUT_STYLE,
  PRIVACY_LEVEL,
  EVENT_STATUS,
  EVENT_ENTITY_TYPE,
} from "enum";

export interface Interaction {
  id: number;
  application_id: string;
  type: INTERACTION_TYPE | number; // TODO Find if there is some other way to include future api changes
  name: string;
  guild_id?: string;
  channel_id?: string;
  member?: GuildMember; // Used when invocing in a guild
  user?: DiscordUser; // Used when invocing in a DM
  token: string;
  version: number;
  message?: Message;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

export interface ApplicationCommandInteraction extends Interaction {
  data: ApplicationCommandInteractionData;
}

export interface MessageComponentInteraction extends Interaction {
  data: MessageInteractionData;
}

export interface ModalInteractionData extends Interaction {
  data: ModalSubmitInteractionData;
}

// Sent int APPLICATION_COMMAND and APPLICATION_COMMAND_AUTOCOMPLETE
export interface ApplicationCommandInteractionData {
  id: string;
  name: string;
  type: APPLICATION_COMMAND_TYPE;
  resolved: ResolvedData;
  options?: CommandOption[];
  guild_id?: string;
  target_id?: string;
}

export interface MessageInteractionData {
  custom_id: string;
  component_type: MESSAGE_COMPONENT_TYPE;
  values?: SelectMenuOption[];
}

export interface ModalSubmitInteractionData {
  custom_id: string;
  title: string;
  components: Component[];
}

export interface InteractionResponse {
  type: INTERACTION_RESPONSE_TYPE;
  data?: InteractionResponseData | ModalSubmitInteractionData;
}

interface InteractionResponseData {
  tts?: boolean;
  content?: string;
  embeds?: Embed;
  allowed_mentions?: AllowedMentions;
  flag?: number;
  components?: Component[];
  attachments?: Attachment[];
  choices?: ApplicationCommandOptionChoice[];
}

type AllowedMentions = "roles" | "users" | "everyone";

interface ResolvedData {
  users?: DiscordUser[];
  members: GuildMember[];
  roles?: Role[];
  channels?: GuildChannel[];
  messages?: Message[];
  attachments?: Attachment[];
}

interface Role {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: RoleTag[];
}

interface RoleTag {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: boolean;
}

export type Component =
  | ActionRowComponent
  | ButtonComponent
  | TextInputComponent;

export interface ActionRowComponent {
  type: MESSAGE_COMPONENT_TYPE.ACTION_ROW;
  components: (ActionRowComponent | ButtonComponent | TextInputComponent)[];
}

export interface ButtonComponent {
  type: MESSAGE_COMPONENT_TYPE.BUTTON;
  style: BUTTON_STYLE;
  label?: string;
  emoji?: Emoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface SelectMenuComponent {
  type: MESSAGE_COMPONENT_TYPE.SELECT_MENU;
  custom_id: string;
  options: SelectMenuOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface TextInputComponent {
  type: MESSAGE_COMPONENT_TYPE.TEXT_INPUT;
  custom_id: string;
  style: TEXT_INPUT_STYLE;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

interface SelectMenuOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
}

export interface GuildMember {
  user?: DiscordUser;
  nick?: string;
  avatar?: string;
  roles: string[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string;
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: string;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export interface Message {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp?: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: DiscordUser[];
  mention_roles: string[]; // array of role ids
  mention_channels: GuildChannel[];
  attachments: Attachment[];
  embeds: Embed[];
  reactions: Reaction[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: number;
  activity?: Activity;
  application: Application;
  application_id?: string;
  message_reference?: MessageReference;
  flags?: number;
  referenced_message?: Message;
  interaction?: MessageInteraction;
  thread?: GuildChannel;
  components?: Component[];
  sticker_items?: StickerItem[];
  stickers: Sticker[];
}

interface MessageInteraction {
  id: string;
  type: INTERACTION_TYPE;
  name: string;
  user: DiscordUser;
  member?: GuildMember;
}

interface MessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exist?: boolean;
}

interface Attachment {
  id: string;
  filename: string;
  description: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
}

interface Embed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: {
    text?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  image?: {
    id?: string;
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  thumbnail?: {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  video?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

interface Reaction {
  count: number;
  me: boolean;
  emoji: Emoji;
}

interface Activity {
  type: MESSAGE_ACTIVITY_TYPE;
  party_id?: string;
}

interface Application {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: DiscordUser[];
  mention_roles: string[];
  mention_channels: GuildChannel[];
  attachments: Attachment[];
  embeds: Embed[];
  reactions?: Reaction[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: MESSAGE_TYPE;
  activity?: Activity;
  application?: Application;
  application_id: string;
  message_reference?: MessageReference;
  flags?: number;
  referenced_message?: Message;
  interaction?: MessageInteraction;
  thread: GuildChannel;
  components?: Component[];
  sticker_items?: StickerItem[];
  stickers: Sticker[];
}

interface Emoji {
  id: string;
  name: string;
  roles?: string[]; // array of role ids
  user?: DiscordUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

interface GuildChannel {
  id: string;
  type: CHANNEL_TYPE;
  guild_id: string;
  position: number;
  permission_overwrites: Overwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: DiscordUser[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: ThreadMetadata;
  member?: ThreadMember;
  default_auto_archive_duration?: number;
  permissions: string;
  flags?: number;
}

interface StickerItem {
  id: string;
  name: string;
  format_type: string;
}

interface ThreadMetadata {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: string;
}

interface ThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: string;
  flags: number;
}

interface Overwrite {
  id: string;
  type: 0 | 1; // 0 = role, 1 = user
  allow: string;
  deny: string;
}

export interface CommandOption {
  focused?: boolean;
  name: string;
  type: number;
  value?: string | number;
  options?: CommandOption[];
}

export interface ApplicationCommandOptionChoice {
  name: string;
  name_localizations?: Record<string, string>;
  value: string | number;
}

export interface ApplicationCommandOption {
  type: APPLICATION_COMMAND_OPTION_TYPE;
  name: string;
  name_localizations?: Record<string, string>;
  description: string;
  description_localizations?: Record<string, string>;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
  channel_types?: CHANNEL_TYPE[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}

export interface ApplicationCommand {
  id?: string;
  type?: APPLICATION_COMMAND_TYPE;
  application_id?: string;
  guild_id?: string;
  name: string;
  name_localizations?: Record<string, string>;
  description: string;
  description_localizations?: Record<string, string>;
  options?: ApplicationCommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  default_permission?: boolean;
  version?: string;
}

interface Sticker {
  id: string;
  pack_id?: string;
  name: string;
  description?: string;
  tags: string;
  asset?: string;
  type: number;
  format_type: number;
  available?: boolean;
  guild_id?: string;
  user: DiscordUser;
  sort_value?: number;
}

export interface Guild {
  id: string;
  name: string;
  icon?: string;
  icon_hash?: string;
  splash?: string;
  discovery_splash?: string;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  region?: string;
  afk_channel_id: string;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: string;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: Role[];
  emojis: Emoji[];
  features: GuildFeature[];
  mfa_level: number;
  application_id?: string;
  system_channel_id?: string;
  system_channel_flags: number;
  rules_channel_id?: string;
  max_presences?: number;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: string;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: string;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: WelcomeScreen;
  nsfw_level: number;
  stickers?: Sticker[];
  premium_progress_bar_enabled: boolean;
}

type GuildFeature =
  | "ANIMATED_BANNER"
  | "ANIMATED_ICON"
  | "AUTO_MODERATION"
  | "BANNER"
  | "COMMERCE"
  | "COMMUNITY"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITE_SPLASH"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MONETIZATION_ENABLED"
  | "MORE_STICKERS"
  | "NEWS"
  | "PARTNERED"
  | "PREVIEW_ENABLED"
  | "PRIVATE_THREADS"
  | "ROLE_ICONS"
  | "TICKETED_EVENTS_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";

interface WelcomeScreen {
  description?: string;
  welcome_channels?: WelcomeChannel[];
}

interface WelcomeChannel {
  channel_id: string;
  description: string;
  emoji_id: string;
  emoji_name: string;
}

export interface DiscordError {
  code: number;
  errors?: [key: string, value: object][];
  message: string;
}

interface EntityMetadata {
  location: string;
}

export interface GuildEvent {
  id: string;
  guild_id: string;
  channel_id?: string;
  creator_id?: string;
  name: string;
  description: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  privacy_level: PRIVACY_LEVEL;
  status: EVENT_STATUS;
  entity_type: EVENT_ENTITY_TYPE;
  entity_id: string;
  entity_metadata: EntityMetadata;
  creator: DiscordUser;
  user_count?: number;
  image?: string;
}

export interface CreateMessage {
  content?: string;
  nonce?: number | string;
  tts?: boolean;
  embed?: Embed[];
  allowed_mentions?: AllowedMentions;
  message_reference?: MessageReference;
  components?: Component[];
  sticker_ids?: string[];
  // files?: File[];
  payload_json?: string;
  attachments?: Attachment[];
  flags?: number;
}
