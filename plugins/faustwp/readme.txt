=== FaustWP ===
Contributors: antpb, apmatthe, blakewpe, claygriffiths, joefusco, markkelnar, mindctrl, modernnerd, rfmeier, wpengine
Tags: faustjs, faust, headless, decoupled
Requires at least: 5.7
Tested up to: 5.9
Stable tag: 0.7.6
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

FaustWP transforms your traditional WordPress installation into a flexible headless CMS.

== Description ==

In conjunction with Faust.js, FaustWP enables a decoupled front-end to authenticate with WordPress through GraphQL mutations and REST API endpoints. It is the connective glue between a Faust.js-powered front-end app, and a WordPress backend.

The plugin also provides useful options for headless sites, such as the ability to:
<ul>
<li>Hide “theme” admin pages.</li>
<li>Redirect public route requests to the front-end application.</li>
<li>Rewrite WordPress URLs to front-end URLs in queried content.</li>
</ul>

== Installation ==

1. Search for the plugin in WordPress under "Plugins -> Add New".
2. Click the “Install Now” button, followed by "Activate".

That's it! For more information on getting started with headless WordPress, see <a href="https://faustjs.org/docs/tutorial/dev-env-setup" target="_blank">Getting Started with Faust.js</a>.

== Changelog ==

= 0.7.6 =

### Patch Changes

- 420d0b4: Remove trailing slash from frontend uri.
- 037b57b: Ensure sitemap URLs use the WordPress domain and not the headless frontend domain. Fixes a conflict with Yoast SEO that prevented post links from being added to the posts sitemap.

= 0.7.5 =

### Patch Changes

- b7af359: Simplify generation of preview links. Fixes an issue where preview links were missing slashes with certain permalink structures. Thanks @torounit!
- 662c377: Plugin settings are now validated and sanitized before saving.
- c730348: Disables access to the site editor when themes are disabled

= 0.7.4 =

### Patch Changes

- 1dcd987: Removes unused event callbacks for rewrite rule and post status changes. The `is_events_enabled()` function has also been removed.
- 5c69b68: ConditionalTags has been deprecated as it was introduced in an older version of the framework when routing was done from the NextTemplateLoader. Now that we are using Next.js pages for routing, conditionalTags are no longer needed.
- 7d156ba: Add a documentation link that explains "Features" checkbox settings in more detail

[View the full changelog](https://faustjs.org/docs/changelog/faustwp)