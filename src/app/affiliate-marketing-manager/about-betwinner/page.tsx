
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { SocialIcons } from '@/components/social-icons';

export default function AboutBetwinnerPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/affiliate-marketing-manager">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Affiliate Marketing" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary">
          <TranslatedText text="About Betwinner" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl prose prose-lg dark:prose-invert max-w-none text-foreground">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="BETWINNER official website of BC Betwinner" />
          </h2>
          <p>
            <TranslatedText text="The official website of the bookmaker Betwinner is visited daily by hundreds of thousands of players from different countries. Betters from Russia use the working mirror for today and right now." />
          </p>
          <p>
            <TranslatedText text="Other users place bets in the full and mobile versions, Betwinner application on Android, IOS. The bookmaker provides a large number of additional outcomes: European handicap, exact score, game progress, more/less, which team will score the first goal." />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Betwinner official website" />
          </h3>
          <p>
            <TranslatedText text="We recommend starting your acquaintance with the official website of the bookmaker Betwinner from the footer. Here you will find an informational menu and categories with gambling entertainment." />
          </p>
          
          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Website Screenshot"
            width={800}
            height={400}
            data-ai-hint="website interface"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />

          <p><TranslatedText text="Namely:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="information – about us, contacts, affiliate program, rules;" /></li>
            <li><TranslatedText text="bets – line, live, multi-live, casino, toto;" /></li>
            <li><TranslatedText text="games – win games, TV games, virtual sports, bingo;" /></li>
            <li><TranslatedText text="statistics – results (general and live);" /></li>
            <li><TranslatedText text="useful – coupon check, mobile version, payment methods." /></li>
          </ul>
          <p>
            <TranslatedText text={`Then we recommend paying attention to the "Settings" menu. In it, you can both activate and deactivate certain functions. Based on personal preferences, the player will customize the interface and start a comfortable game.`} />
          </p>
          <p>
            <TranslatedText text="In terms of gambling entertainment, the Betwinner bookmaker is ready to offer:" />
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="sports bets are accepted before the start of the game and during the match;" /></li>
            <li><TranslatedText text="slot machines are licensed and have a high payout percentage;" /></li>
            <li><TranslatedText text="scratch cards – Express 200, Scratchy Mini, King Treasure, Happy Scratch, Dream Car Urban, Dream Car Suv, Gold Rush, Ruby Rush, Cut the Grass, Scratch Em, Koi Cash;" /></li>
            <li><TranslatedText text="lotto – Mega Millions, Euro Jackpot, El Cordo de la Primitiva, Gosloto, Super Lotto, Megalot, Germany Lottery, Irish Lottery, Tattslotto4;" /></li>
            <li><TranslatedText text="bingo – Salsa Technology, FLG Games, Atmosfera, Zitro, Lotto Race, Nsoft Lottery, JDB Bingo, Ses Gaming;" /></li>
            <li><TranslatedText text="Crex 24 cryptocurrency exchange provides favorable conditions for trading cryptocurrency." /></li>
          </ul>
          <p>
            <TranslatedText text="The line of the bookmaker Betwinner has over 5,000 outcomes on various sports disciplines: hurling, futsal, dog racing, squash, horse racing, poker, beach volleyball, darts, golf, boxing, volleyball, baseball, auto racing, cyber sports. In live, betters have access to about 800 outcomes. The player chooses the discipline he wants to bet on, and the bookmaker Betwinner offers all possible options." />
          </p>
          
          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Sports Betting Line"
            width={800}
            height={400}
            data-ai-hint="sports betting"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />

          <p>
            <TranslatedText text="In the right vertical block the bookmaker has prepared special offers of the day:" />
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="Football. Swedish Championship. Allsvenskan – AIK Stockholm x Kalmar;" /></li>
            <li><TranslatedText text="Football. Swedish Championship. Allsvenskan – Orebro SK x Hammarabyu." /></li>
          </ul>
          <p>
            <TranslatedText text="Bonus games are presented in the Promo menu on the main page: Memory, Chest, Safe, Dragon, Wheel of Fortune, Daily Lottery. In this directory you can find the cyber bonus calendar. The player selects the date of interest and places a bet on an active game." />
          </p>
          
          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Betwinner mirror working today" />
          </h3>
          <p>
            <TranslatedText text="A working mirror today is one of the surefire and safe options for accessing the blocked website of the bookmaker Betwinner. Hundreds of thousands of players from Russia regularly face this problem. So that they can place bets on sports at any time, the bookmaker offers to use a mirror copy." />
          </p>
          
          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Mirror"
            width={800}
            height={400}
            data-ai-hint="website mirror"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />

          <p><TranslatedText text="It performs all the functions of the official Betwinner website:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="watching online broadcasts of matches;" /></li>
            <li><TranslatedText text="placing bets on sports with lines and live;" /></li>
            <li><TranslatedText text="access to sports statistics;" /></li>
            <li><TranslatedText text="replenishment of the deposit through many payment systems;" /></li>
            <li><TranslatedText text="withdrawal of winnings to bank cards;" /></li>
            <li><TranslatedText text="identity verification." /></li>
          </ul>
          <p>
            <TranslatedText text={`You can request mirror addresses from the bookmaker's support service, or on the Internet using search queries: "mirror, betwinner, bookmaker, office, download". It is important not to get to fake mirrors, where they may not give you your winnings or even transfer all the funds from your deposit.`} />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Betwinner registration of a new gaming account" />
          </h3>
          <p>
            <TranslatedText text="Registration of a new gaming account at the Betwinner bookmaker's office is carried out in one of four ways. All of them are presented in the 'Registration' menu on the main page of the official website." />
          </p>

          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Registration"
            width={800}
            height={400}
            data-ai-hint="registration form"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />
          
          <p><TranslatedText text="Based on personal preferences, the player chooses:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="by phone – enter the phone number in international format (country and city code plus phone number), select the currency and add a promo code;" /></li>
            <li><TranslatedText text="in 1 click – select from the list the country of actual residence and currency;" /></li>
            <li><TranslatedText text="by email address – fill in all required fields, create and duplicate a password;" /></li>
            <li><TranslatedText text="via social networks Vk, Facebook, Instagram, Twitter. In the future, the player will log in to the site using the account of the selected social network or with the received login and password." /></li>
          </ul>
          <p>
            <TranslatedText text="By clicking the 'Register' button, the Betwinner BC player confirms that he has read and agreed to the rules and privacy policy of the company, confirms that he is of legal age." />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Betwinner promo code for today upon registration" />
          </h3>
          <p>
            <TranslatedText text={`For active and goal-oriented players, a huge number of bonus programs are prepared. One of them is "Sport" for the 1st deposit up to 100 euros.`} />
          </p>
          <p><TranslatedText text="To get it, you need to:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="Register on the official website." /></li>
            <li><TranslatedText text="Enter personal data into your personal account." /></li>
            <li><TranslatedText text="Top up your deposit to 100 euros or in another national currency, but in an equivalent amount." /></li>
            <li><TranslatedText text="Check the accrual of funds to the bonus account (happens automatically)." /></li>
          </ul>
          <p>
            <TranslatedText text="The user of the bookmaker Betwinner has the right to receive 1 bonus. The minimum deposit is 1 euro or in any currency, but equivalent to this amount. To activate and receive bonus money, wagering is required." />
          </p>

          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Promo Code"
            width={800}
            height={400}
            data-ai-hint="promo code"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />
          
          <p>
            <TranslatedText text="The bettor places a 5-fold bonus bet in express bets. Each of them must have at least 3 events. At least 3 events must have odds of at least 1.40. The start dates of the selected events must not be later than the validity period of the bonus offer." />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Download Betwinner for android" />
          </h3>
          <p>
            <TranslatedText text="You can download the Betwinner app for Android using the link betwinnerapp.com. The operating system logo will appear at the top of the page. The player clicks on the download button and the apk file is downloaded in a matter of seconds. For quick installation, you need to allow downloading software from unknown sources in the device settings." />
          </p>
          <p><TranslatedText text="The Betwinner app for Android is different:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="mobility and autonomy - the entire range of gambling entertainment on your phone and always at hand;" /></li>
            <li><TranslatedText text="speed of work – fast, convenient, safe;" /></li>
            <li><TranslatedText text="saving traffic and battery power;" /></li>
            <li><TranslatedText text="availability under restricted conditions for Russian users." /></li>
          </ul>
          <p>
            <TranslatedText text="Regardless of Roskomnadzor blocking, the Betinner app on Android always works. You no longer need to look for a mirror or another workaround to play for money at the Betwinner bookmaker." />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Download Betwinner on iPhone" />
          </h3>
          <p>
            <TranslatedText text={`In the upper left corner of the site there is a quick access button "Application on smartphone". In this menu the player selects "IOS devices download application". After that the window "Scan the QR code from your iPhone to install the application" will appear on the smartphone screen.`} />
          </p>
          
          <Image
            src="https://placehold.co/400x400.png"
            alt="QR code for Betwinner iOS app"
            width={250}
            height={250}
            data-ai-hint="QR code"
            className="rounded-lg my-6 mx-auto block object-cover shadow-md"
          />

          <p><TranslatedText text="In a few seconds, the bookmaker user will receive a link or file to unpack the installation of the client program." /></p>
          <p><TranslatedText text="The Betwinner iPhone app allows you to:" /></p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="register a new gaming account;" /></li>
            <li><TranslatedText text="take advantage of bonus offers;" /></li>
            <li><TranslatedText text="undergo identity verification;" /></li>
            <li><TranslatedText text="top up your deposit in any convenient way;" /></li>
            <li><TranslatedText text="place bets on sports, including live;" /></li>
            <li><TranslatedText text="watch online broadcasts;" /></li>
            <li><TranslatedText text="view betting and transaction history." /></li>
          </ul>
          <p>
            <TranslatedText text="Everything that is available in the full version of the official Betwinner website is available in the iPhone app." />
          </p>

          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="Betwinner slots play" />
          </h3>
          <p>
            <TranslatedText text="Slots are a great alternative to sports betting and betting. Betwinner slot machines feature rich colors, famous cartoon or gamer characters, and fun sound effects. Well-known providers worked on the development of slots, which guarantee a high percentage of return." />
          </p>

          <Image
            src="https://placehold.co/800x400.png"
            alt="Betwinner Slots"
            width={800}
            height={400}
            data-ai-hint="casino slots"
            className="rounded-lg my-6 w-full object-cover shadow-md"
          />
          
          <p><TranslatedText text="The most sought-after software developers:" /></p>
          <p>
            <TranslatedText text="Amatic, Blieprint, Ruby Play, Game Art, Betsoft, Wazdan, Swint, IsoftBet, ELK, Red Rake, Habanero, Spinomenal, Microgaming, NetEnt, Red Tiger" />
          </p>
          <p>
            <TranslatedText text={`Betwinner users can add their favorite slots to the "Favorites" category. This will save time on searching and loading the gaming machine of interest. The following are among the popular Betwinner machines:`} />
          </p>
          <p>
            <TranslatedText text="Bubbles Bonanza, Book of Secret 6, Fruit on Ice, 15 Dragon Pearls, Arabian Spins, Book of Anunnaki, Wild Vick, Green Fog, Aztec StarGems." />
          </p>
          
          <h3 className="text-2xl font-semibold text-accent mt-8 mb-4">
            <TranslatedText text="How to withdraw money from Betwinner" />
          </h3>
          <p>
            <TranslatedText text={`The footer of the official Betwinner website has a menu called “Useful”, which includes a tab called “Payment Methods”. All possible methods for withdrawing money are presented here:`} />
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><TranslatedText text="electronic wallets – Skrill, Jeton, Sticpay, Piastrix;" /></li>
            <li><TranslatedText text="payment systems – ecoPayz, Neteller, Payeer;" /></li>
            <li><TranslatedText text="cryptocurrencies – Litecoin, Dash, Monero, Bitcoin Gold, Zcash, Nem, Dogecoin, Etherium, Digi Byte, Verge, Qtum, Ripple." /></li>
          </ul>
          <p>
            <TranslatedText text="The minimum amount available for withdrawal in the Betwinner bookmaker is one hundred rubles. But depending on the payment system used, it may change. When withdrawing cryptocurrency, no commission is charged." />
          </p>

          <div className="mt-8 text-center text-muted-foreground">
            <p><TranslatedText text="WORKING MIRROR FOR TODAY" /></p>
            <p><TranslatedText text="1xbet registration" /></p>
            <p><TranslatedText text="BETWINNER SUPPORT SERVICE" /></p>
            <p className="mt-4"><TranslatedText text="© 2025 Betwinner official website - registration and login to your personal account Betwinner" /></p>
          </div>
        </section>
      </main>
      <footer className="text-center py-6 border-t border-border">
        <div className="flex flex-col items-center gap-4">
            <SocialIcons className="flex space-x-4 justify-center" />
            <Button variant="link" asChild>
            <Link href="/affiliate-marketing-manager">
                <TranslatedText text="Return to Affiliate Marketing" />
            </Link>
            </Button>
        </div>
      </footer>
    </div>
  );
}
