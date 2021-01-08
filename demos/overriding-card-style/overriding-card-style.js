const getConfig = async () => {
  const config = { cardConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let card;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      const checkout = new AdyenCheckout({
        environment: config.environment,
        clientKey: config.clientKey,
        locale: localeConfig.locale,
      });

      var styleObject = {
        base: {
          fontSize: '20px',
          fontFamily: 'Comic Sans MS'
        }
      };

      card = checkout
        .create('card', {
          styles: styleObject,
          ...config.cardConfig,
          onFocus: (state) => {
            document.querySelectorAll('.adyen-checkout__field--error').forEach(function(item) {
              item.querySelector('.adyen-checkout__icon').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAsRQTFRFAAAAAAAAWlpagYGBhYWFZ2dnY2NjXl5eWFhYU1NTVFRUJiYmAAAAAAAAAAAAX19f/v7+6urqu7u719fX29vb2dnZ4eHh4ODg0NDQ0tLSysrKgYGBLS0tAAAAAAAAUFBQ+/v73t7ewsLCzs7O4+Pj5+fn0dHR+Pj4////4+Pj5OTk5+fn7OzsTExMAAAAAAAADQ0NqKio9fX10NDQlJSUbGxsm5ubzs7O+fn55ubm29vb1NTU4uLifX19BgYGGBgYXV1dq6urwMDA1NTUqampY2NjREREe3t7VlZW2NjY3d3dW1tbQkJCXFxcxsbG4eHhu7u7U1NTZGRksbGxmJiYl5eXkJCQk5OTjIyMxcXFu7u79/f38fHxeHh45ubm1NTUsrKympqaoqKiiYmJo6Ojm5ublZWVNjY2eHh429vb+/v7urq6iIiI9PT0tbW1vb29tLS029vbjo6Obm5uqqqqWlpavLy8ZmZmhoaGqqqqpqamrKyspaWl6enpra2tioqKzs7Ov7+/OTk50dHRYGBgGhoacHBw+fn5TExMODg4z8/PYmJidHR0kJCQfHx8nJycXl5eOzs7TU1NS0tLAAAAKioqnp6eZWVli4uLWVlZOzs7mZmZb29vhISEWVlZhYWFUFBQOTk5Jycnt7e3SkpKAAAAZGRk+vr6qKiosLCw3d3doKCgpqamMTExExMTAQEBAAAACwsLMDAwwcHBAQEBbm5u2NjYZWVlsrKy2NjYjIyM7+/vgICAc3NzZmZmaGho1dXVSkpKAAAAPz8/l5eXw8PDwMDAy8vLu7u7mJiYg4ODkZGRzs7O8vLy3NzcTU1NAAAAGxsbVFRUkJCQzc3Nx8fHycnJ5eXl1dXVUlJSOzs7ra2t7e3t9/f339/f39/f2trarq6uKCgoBAQERkZGf39/sLCwwsLCw8PDjY2NIiIiAAAAjLF0uAAAAOx0Uk5TACSnwMTDwL24sKCCYiMb5//89/j6+vv6/PT1+ZIKA6P+/Pj5+/v7/v/9+/39kAUBNOz+/f7//f7+/f///cwhRtf5/vz9+/z5+v///Pz7/vz6wcz6/Pv8/Pv+/f//+/7+/fz69/r6+/r5/f/7/P/9/vz8+Nn6+vv5+fv8/P3//Pv7/Pv81FHs//n7/fn6+vn6+vn4fARg/Pn8/Pz8+vn6+vr8/f9jCMH//fv8/P78/f///Pr/LNH7+/r++f35+vr4/mYTsPH39/z8+/r8/f79bglAq/j49/f7+nu3+f7++vv6+Vpckb/KycnBWQZKizn4AAAAsklEQVQY02NkYGBgRAafgXwGBj5GVPCYkUEOmf9GFETqMzJ+54IIfBCEitozYgAWYSjjgiFCTAhC33RiZNztdkJEFcQpZtzvhKaXSUgoZLGQ0B1BQUEBCLjGz8LPOFGAj9EFocqLkZFhKWNTPVwA5KePQH9sYWTMC7WDia4NAcowMByC8C7rMTJu9gOrBoILEMF/Dof9Ph4q72IBiRkAw+ImUNCafRdj1ySIOjDgvQYzEgCKBSPYIiwmmwAAAABJRU5ErkJggg==';
              })
          },
        })
        .mount('#card-container');
    });
  });
};

loadComponent();
