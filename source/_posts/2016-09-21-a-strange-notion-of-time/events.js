//
// Historical events from 1916 to 1982 according to Wikipedia
// https://en.wikipedia.org/wiki/Timeline_of_modern_history
//
var events = {
    1916: ["Easter Rising in Ireland", "The implementation of daylight saving time", "Warlord Era begins in China", "David Lloyd George becomes the Prime Minister of the United Kingdom", "The Gallipoli Campaign fails", "First use of tanks at the Battle of Flers-Courcelette", "Battle of the Somme", "Grigory Rasputin is assassinated by H.H", "Prince Felix Youssoupov", "The Pact is agreed upon by both the Congress and the Muslim League at the Indian city of Lucknow", "Battle of Verdun", "The Arab Revolt begins"],
    1917: ["Russian Revolution ends the Russian Empire; beginning of Russian Civil War", "USA join the Allies for the last 17 months of World War I", "Independence of Poland and Finland recognised", "The first Pulitzer Prizes are awarded", "October Revolution in Russia", "Ukrainian–Soviet War begins"],
    1918: ["End of World War I", "German Revolution begins", "Abdication of Kaiser Wilhelm II", "Spanish flu pandemic", "Murder of Tsar Nicholas II and his family", "Poland, Ukraine and Belarus are among a number of states to declare independence from Russia", "Finnish Civil War", "Mehmed VI becomes last Sultan of the Ottoman Empire and last Caliph", "Partitioning of the Ottoman Empire begins", "The Kingdom of Iceland and The State of Slovenes, Croats and Serbs are established", "The British occupy Palestine", "Mutawakkilite Kingdom of Yemen is founded", "Azerbaijan Democratic Republic is declared", "Armenian–Azerbaijani War begins", "Polish–Ukrainian War begins"],
    1919: ["Treaty of Versailles redraws European borders", "German Revolution ends with the collapse of the German Empire and the establishment of the Weimar Republic", "Victory for Estonia in the Estonian War of Independence", "League of Nations founded in Paris", "Polish-Soviet War begins", "The Italian National Fascist Party is established by Benito Mussolini", "Comintern established", "Egyptian Revolution of 1919", "Turkish War of Independence begins", "End of Polish–Ukrainian War", "The International Labor Organisation is established", "Ernest Rutherford discovers the proton", "First experimental evidence for the General theory of relativity obtained by Arthur Eddington"],
    1920: ["Mexican Revolution ends", "Greece restores its monarchy after a referendum", "Red Army invasion of Azerbaijan and Armenia ends the Armenian–Azerbaijani War and concludes with their incorporation into the Soviet Union", "Mohandas Gandhi launches Non-cooperation movement", "Prohibition in the United States enforced"],
    1921: ["Adolf Hitler becomes Führer of the Nazi Party as hyperinflation in the Weimar Republic begins", "Russia invades Georgia and incorporates it into the Soviet Union", "End of Russian Civil War, Polish-Soviet War and Ukrainian–Soviet War", "Coup brings the Pahlavi dynasty to power in Iran"],
    1922: ["Ottoman Sultanate abolished by the Turkish Grand National Assembly; Sultan Mehmed VI is deposed", "Irish Free State is established, while the Province of Northern Ireland is created within The United Kingdom", "The Irish Civil War begins", "The Italian reconquest of Libya begins", "The union of Costa Rica, Guatemala, Honduras and El Salvador is dissolved", "Egypt gains independence from the United Kingdom, though British forces still occupy the Suez Canal", "March on Rome brings Benito Mussolini to power in Italy", "Howard Carter discovers Tutankhamen's tomb", "Gabriel Narutowicz, President of Poland is assassinated", "The Union of Soviet Socialist Republics (USSR), the world's first officially Communist state, is formed", "Pius XI becomes Pope", "James Joyce publishes Ulysses", "The Washington Naval Treaty is signed", "Mohandas Gandhi calls off Non-cooperation movement"],
    1923: ["Hyperinflation in the Weimar Republic ends with the introduction of the Rentenmark", "Time Magazine is first published", "Irish Civil War ends", "The Beer Hall Putsch, an attempt to overthrow the Weimar Republic, ends in failure and brief imprisonment for Adolf Hitler but brings the Nazi Party to national attention", "A military coup ousts and kills Bulgarian Prime Minister Aleksandar Stamboliyski", "The Great Kantō earthquake kills at least 105,000 people in Japan", "Turkish War of Independence ends; Kemal Atatürk becomes the first President of the newly established Republic of Turkey; Ankara replaces Istanbul as its capital", "The Walt Disney Company is founded"],
    1924: ["Death of Vladimir Lenin triggers power struggle between Leon Trotsky and Joseph Stalin", "The Caliphate is abolished by Kemal Atatürk", "The U.S", "Federal Bureau of Investigation founded under J", "Edgar Hoover", "The August Uprising in Georgia against Soviet rule", "George Gershwin composes Rhapsody In Blue", "U.S. Immigration Act of 1924 significantly restricts immigration from Asia, the Middle East, and Southern Europe"],
    1925: ["Benito Mussolini gains dictatorial powers in Italy", "Mein Kampf is published", "First televisual image created by John Logie Baird", "Locarno Treaties are signed", "Serum run to Nome"],
    1926: ["Hirohito becomes Emperor of Japan", "Coups in Greece, Poland and Portugal install new dictatorships"],
    1927: ["The Jazz Singer, the first \"talkie\", is released", "Joseph Stalin becomes leader of the Soviet Union", "Chinese Civil War begins", "Bath School disaster", "Australian Parliament convenes in Canberra for the first time", "The United Kingdom of Great Britain and Ireland officially becomes the United Kingdom of Great Britain and Northern Ireland", "Saudi Arabia gains independence", "The BBC is granted a Royal Charter in the United Kingdom", "World population reaches 2 billion", "Charles Lindbergh's flight to Paris"],
    1928: ["Discovery of penicillin by Alexander Fleming", "Warlord Era ends in China", "Malta becomes a British Dominion", "Bubble gum is invented", "King Zog I is crowned in Albania", "The Kellogg-Briand Pact is signed in Paris", "The International Red Cross and Red Crescent Movement is established", "Mickey Mouse is created at the Walt Disney Studio", "Hassan al-Banna founds the Muslim Brotherhood"],
    1929: ["Wall Street crash of 1929 and the beginning of the Great Depression", "Leon Trotsky is exiled First people sent to the gulag in the Soviet Union as Stalin assumes effective control", "Pope Pius XI signs the Lateran Treaty with Italian leader Benito Mussolini", "Vatican City is recognised as a sovereign state", "Saint Valentine's Day Massacre", "The first Academy Awards are presented"],
    1930: ["Aided by the Great Depression, the Nazi Party increases its share of the vote from 2.6% to 18.3%", "Clyde Tombaugh discovers Pluto", "Salt March by Mohandas Gandhi and the official start of civil disobedience in British India", "Military coups replace governments in Peru and Brazil", "Haile Selassie becomes king of Abyssinia", "First FIFA World Cup hosted"],
    1931: ["Floods in China kill up to 2.5 million people", "Independence of South Africa", "Construction of the Empire State Building", "\"The Star-Spangled Banner\" is adopted as the United States's national anthem", "The Second Spanish Republic is declared", "The Chinese Soviet Republic is proclaimed by Mao Zedong", "Statute of Westminster creates the British Commonwealth of Nations", "Japan invades Manchuria, China and occupies it until the end of World War II"],
    1932: ["Franklin D", "Roosevelt is elected President of the United States", "Éamon de Valera becomes President of the Executive Council (prime minister) of the Irish Free State", "The Nazi party becomes the largest single party in the German parliament", "Military coup in Chile", "BBC World Service starts broadcasting", "The Neutron is discovered", "Lindbergh baby kidnapping"],
    1933: ["Adolf Hitler becomes Chancellor of Germany", "New Deal begins in America", "Japan and Germany announce they are going to leave the League of Nations", "United States occupation of Nicaragua ends", "Prohibition in the United States is abolished"],
    1934: ["Dictatorships begin in Brazil and Bolivia", "Mao Zedong begins the Long March", "United States occupation of Haiti ends", "United States grants more autonomy to the Philippines", "Adolf Hitler instigates the Night of the Long Knives, which cements his power over both the Nazi Party and Germany", "With the death of President Hindenburg, Hitler declares himself Fuhrer of Germany", "Bonnie and Clyde are shot to death in a police ambush", "John Dillinger is gunned down by the FBI outside the Biograph Theater"],
    1935: ["Second Italo-Abyssinian War concludes with the exile of Haile Selassie and the conquest of Abyssinia by Benito Mussolini", "Persia becomes Iran", "William Lyon Mackenzie King is elected Prime Minister of Canada", "Enactment of the Nuremberg racial laws"],
    1936: ["Beginning of the Spanish Civil War", "Great Purge begins under Stalin", "Edward VIII becomes King of the British Commonwealth and Emperor of India, before abdicating and handing the throne to his brother, George VI", "George Nissen and Larry Griswold build the first modern trampoline", "Hoover Dam is completed", "Arab Revolt in Palestine against the British begins to oppose Jewish immigration", "Italy annexes Ethiopia", "\"Benjamin\", the last known thylacine, dies in Hobart Zoo"],
    1937: ["Japanese invasion of China, and the beginning of World War II in the Far East", "Rape of Nanking", "Neville Chamberlain becomes Prime Minister of the United Kingdom", "The Irish Republican Army attempts to assassinate King George VI of the United Kingdom", "Snow White and the Seven Dwarfs is the first feature-length animated movie released", "Deaths of George Gershwin and Maurice Ravel", "German zeppelin Hindenburg crashes in Lakehurst, New Jersey"],
    1938: ["Anschluss unifies Germany and Austria", "Munich agreement hands Czechoslovakia to Nazi Germany", "Great Purge ends after nearly 700,000 executions", "Kristallnacht in Germany, while Time Magazine declares Adolf Hitler as Man of the Year", "DC Comics hero Superman has its first appearance"],
    1939: ["End of Spanish Civil War; Francisco Franco becomes dictator of Spain", "Molotov–Ribbentrop Pact between Germany and the Soviet Union", "Nazi invasion of Poland triggers the beginning of World War II in Europe", "Soviet invasion of Poland begins 16 days later", "Palestinian revolt against the British ends", "Pius XII becomes Pope", "Death of Sigmund Freud"],
    1940: ["Nazis invade France, the Netherlands, Denmark and Norway", "Katyn massacre of Polish soldiers in USSR and the Soviet occupation of the Baltic states", "Winter War between Soviet Union and Finland", "Soviet Union annexes the Baltic states", "Winston Churchill becomes Prime Minister of the United Kingdom", "Battle of Britain, the first entirely aerial military campaign, becomes the first significant defeat for the Axis powers", "The Blitz begins", "Leon Trotsky is assassinated", "Chechen insurgency begins in Soviet Union"],
    1941: ["Operation Reinhard commences the main phase of The Holocaust", "Attack on Pearl Harbor, which leads to the USA joining World War II", "Hitler commences the Nazi invasion of the Soviet Union", "Siege of Tobruk in North Africa is the first major defeat for Hitler's land forces", "Siege of Leningrad begins"],
    1942: ["Battle of Midway", "Battle of the Coral Sea", "First and second Battles of El Alamein", "Battle of Stalingrad and Guadalcanal Campaign begin", "Internment of Japanese-American citizens in the US begins", "Manhattan Project begins"],
    1943: ["Battle of Stalingrad ends with over two million casualties and the retreat of the German Army", "The failed Battle of Kursk becomes the last Nazi offensive on the Eastern Front", "Warsaw Ghetto uprising fails", "Tehran Conference between Franklin Roosevelt, Winston Churchill and Joseph Stalin agrees to launch Operation Overlord", "Green Revolution begins"],
    1944: ["D-Day", "The Siege of Leningrad ends with Soviet victory after over a million deaths", "Chechen insurgency ends with deportation of the entire Chechen population", "First operational electronic computer, Colossus, comes online", "Death of Edvard Munch"],
    1945: ["Bombing of Dresden", "Battle of Berlin", "Yalta Conference", "End of World War II in Europe", "The Holocaust ends after ~12 million deaths, including 6 million Jews", "Deaths of Franklin Delano Roosevelt, Adolf Hitler and Benito Mussolini", "Creation of the atomic bomb, and the atomic bombings of Hiroshima and Nagasaki", "End of World War II in Asia and beginning of the Occupation of Japan", "Potsdam Conference divides Europe into Western and Soviet blocs", "United Nations founded", "Independence of Korea", "Deaths of Anne Frank and Béla Bartók", "Independence of Indonesia", "Nuremberg trials begin"],
    1946: ["Italy becomes a republic", "French Fourth Republic established", "Independence of Jordan", "Nuremberg trials end", "First Indochina War begins", "First images taken of the Earth from space", "Bhumibol Adulyadej becomes King of Thailand", "Mustafa Barzani founds the Kurdistan Democratic Party", "Treaty of Manila declares Philippines independent"],
    1947: ["Independence of India and Pakistan and beginning of First Indo-Pakistani War", "Invention of the first practical transistor", "Breaking of the sound barrier", "Harry Truman establishes the Truman Doctrine of containment of Communism", "Creation of the U.S", "Central Intelligence Agency"],
    1948: ["United Nations establishes Israeli Independence and the formation of the official State of Israel", "Arab-Israeli War", "Berlin Blockade begins", "Marshall Plan; founding of the OECD and the World Health Organization", "Assassination of Mohandas Gandhi", "The independence of Burma", "Beginning of apartheid in South Africa", "Division of North and South Korea", "First Indo-Pakistani War ends", "The Soviet Sever-2 expedition become the first party to indisputably set foot on the North Pole"],
    1949: ["Creation of NATO", "Berlin Blockade ends", "Partition of Germany into the Soviet socialist German Democratic Republic and the NATO-backed Federal Republic of Germany", "COMECON founded by USSR and the Eastern Bloc", "Partition of Kashmir", "Establishment of the People's Republic of China under Mao Zedong; The Republic of China relocates to Taiwan", "Soviet Union tests atomic bomb"],
    1950: ["Communist victory in the Landing Operation on Hainan Island and Wanshan Archipelago Campaign end the Chinese Civil War", "Beginning of the Korean War", "Lhamo Dondrub becomes the 14th Dalai Lama of Tibet"],
    1951: ["Colombo Plan comes into effect", "Treaty of San Francisco ends the Occupation of Japan and formally concludes hostilities between Japan and the US"],
    1952: ["European Defence Community formed", "Egyptian Revolution under Gamal Abdel Nasser overthrows King Farouk and ends British occupation", "Death of King George VI", "Queen Elizabeth II becomes Monarch of the Commonwealth realms", "Bonn–Paris conventions end allied occupation of West Germany", "Slansky Trial in Czechoslovakia", "First Lady of Argentina Eva Perón dies of cancer aged 33", "Detonation of the hydrogen bomb", "First scheduled flight by commercial jet", "Development of the first effective polio vaccine by Jonas Salk", "Mau Mau Uprising begins in Kenya"],
    1953: ["Independence of Cambodia", "Discovery of the three-dimensional structure of DNA", "First ascent of Mount Everest", "Mohammed Mossadeq deposed in Iran", "End of the Korean War", "Death of Joseph Stalin; East German Uprising leads to the arrest and execution of Lavrentiy Beria; power struggle begins between Georgy Malenkov and Nikita Khrushchev", "Elvis Presley's musical career is launched"],
    1954: ["Paris Treaty establishes Western European Union, Supreme Court of the United States decides Brown v", "Board of Education, ordering an end to racial segregation in public schools", "Rock Around the Clock by Bill Haley and His Comets, brings rock and roll to the American mainstream", "The Soviet Union generates first electricity by nuclear power", "First Indochina War ends", "Algerian War begins", "First Taiwan Strait Crisis begins"],
    1955: ["Nikita Khrushchev assumes control of the Soviet Union", "Signing of the Warsaw Pact", "First Sudanese Civil War begins", "First Taiwan Strait Crisis ends", "Antimatter first produced", "Formation of the Central Treaty Organization"],
    1956: ["Independence of Sudan and Tunisia and full independence of Pakistan", "French Fifth Republic established", "The Hungarian Uprising crushed by Soviet troops", "Nasser's nationalisation of the Suez Canal triggers the Suez crisis", "Brasilia constructed"],
    1957: ["Launch of Sputnik 1 and the beginning of the Space Age", "Independence of Ghana", "Treaty of Rome, which would eventually lead to the European Union", "Harold Macmillan become British Prime Minister", "First prescription of the combined oral contraceptive pill"],
    1958: ["Great Chinese Famine begins in China", "NASA, the U.S", "Federal Aviation Authority and Campaign for Nuclear Disarmament (CND) founded", "CND's symbol, the peace sign, is first used", "Invention of the optical disc and the cassette tape", "Second Taiwan Strait Crisis"],
    1959: ["Cuban Revolution", "Independence of Cyprus", "Admission of Alaska and Hawaii into the United States", "Uprising in Tibet against China leads to the exile of the Dalai Lama", "First documented AIDS cases", "Beginning of the Vietnam War", "First images of the far side of the Moon", "Richie Valens, Buddy Holly and The Big Bopper die in a plane crash", "By this time, the gulag has been effectively disbanded, after over a million recorded deaths", "World population reaches 3 billion"],
    1960: ["European Free Trade Association formed", "1960 U-2 incident sparks deterioration in relations between superpowers", "Year of Africa: Independence of 17 African nations", "Assassination of Patrice Lumumba begins Congo Crisis begins", "Khrushchev withdraws Soviet cooperation with China, initiating the Sino-Soviet split", "The Birth control pill becomes commercially available", "Sharpeville Massacre in South Africa", "United States presidential election, 1960 marks the first televised debates between presidential candidates", "Mau Mau Uprising ends", "First manned descent to the deepest point on Earth, the Mariana Trench", "Construction of the first laser", "The Beatles form in Liverpool", "Muhammad Ali wins gold in Rome"],
    1961: ["Great Leap Forward ends in China after the deaths of roughly 20 million people", "Construction of the Berlin Wall", "First human spaceflight", "Congo Crisis: Assassination of Prime Minister Patrice Lumumba", "UN Secretary General Dag Hammarskjöld dies in a plane crash"],
    1962: ["Cuban missile crisis", "Algerian war ends with the independence of Algeria", "The Beatles' first record and the beginnings of the British Invasion", "Death of Marilyn Monroe", "Indonesia–Malaysia confrontation begins", "A coup ends the Mutawakkilite Kingdom of Yemen and establishes the Yemen Arab Republic", "North Yemen Civil War begins", "Sino-Indian War", "Second Vatican Council is opened by Pope John XXIII"],
    1963: ["Independence of Kenya and creation of Malaysia", "Birmingham campaign", "Martin Luther King, Jr. delivers \"I Have a Dream\" at the March on Washington", "Assassination of John F", "Kennedy", "Launch of the first geostationary satellite", "Paul VI becomes Pope"],
    1964: ["Leonid Brezhnev ousts Khrushchev and assumes power in the Soviet Union", "Independence of Malta, Malawi and Tanzania", "Civil Rights Act abolishes segregation in the USA", "Colombian armed conflict begins", "The Beatles first visit to the United States", "Rhodesian Bush War begins", "First close-up images of Mars"],
    1965: ["Deaths of Winston Churchill and Malcolm X", "Congo Crisis ends; Joseph Mobutu becomes dictator of the Congo", "Anti-Communist purge in Indonesia kills up to 500,000 people", "Second Indo-Pakistani War", "Second Vatican Council is closed by Pope Paul VI", "Singapore gains independence"],
    1966: ["Indonesia–Malaysia confrontation ends", "China's Cultural Revolution begins", "Independence of Lesotho, Botswana and Barbados"],
    1967: ["Summer of Love", "Six Day War", "Attempted secession of the Republic of Biafra from Nigeria triggers the Nigerian Civil War", "ASEAN founded", "The Beatles release their landmark album Sgt", "Pepper's Lonely Hearts Club Band", "Australian Prime Minister Harold Holt disappears while swimming at Cheviot Beach, Victoria"],
    1968: ["Assassinations of Martin Luther King, Jr", "and Robert F", "Kennedy during the Poor People's Campaign", "Prague Spring crushed by Eastern Bloc military intervention", "May 1968 protests in France", "The Troubles begin in Northern Ireland", "Tet Offensive occurs in South Vietnam"],
    1969: ["Moon landings", "Woodstock festival", "Sino-Soviet border conflict", "The Manson Family Murders", "Creation of ARPANET, the earliest incarnation of the Internet", "Muammar Gaddafi overthrows King Idris of Libya in a Coup d'état and establishes the Libyan Arab Republic", "Death of Dwight D", "Eisenhower", "Stonewall riots in the US instigate the gay rights movement"],
    1970: ["Nigerian Civil War ends with the reintegration of the Republic of Biafra with Nigeria after ~3 million deaths", "Edward Heath becomes Prime Minister of the United Kingdom", "Polish 1970 protests", "Cambodian Civil War begins", "Kent State massacre leaves four students dead and nine injured", "Yemeni Civil War ends", "Ratification of the Nuclear Non-Proliferation Treaty", "Containerisation adopted globally, massively boosting global trade", "Maiden flight of the Boeing 747", "Bhola Cyclone kills 500,000 people in East Pakistan", "Black September in Jordan begins", "Death of Gamal Abdel Nasser", "Anwar Sadat becomes President of Egypt", "Deaths of Jimi Hendrix and Janis Joplin", "Break-up of the Beatles", "FLQ seizes hostages, causing Prime Minister Pierre Elliot Trudeau of Canada to issue the War Measures Act"],
    1971: ["Black September in Jordan ends", "Bangladesh Liberation War ends in independence of Bangladesh from Pakistan and precipitates Third Indo-Pakistani War", "Internment begins in Northern Ireland", "Invention of the microchip", "Idi Amin seizes power in Uganda", "Completion of the World Trade Center (North tower)", "Joseph Mobutu renames The Republic of the Congo Zaire", "Greenpeace founded", "COINTELPRO officially ends"],
    1972: ["Northern Ireland's Bloody Sunday", "First Sudanese Civil War ends", "Martial law declared in the Philippines by President Ferdinand E. Marcos Munich massacre occurs at the 1972 Summer Olympics in Munich, Germany"],
    1973: ["1973 Chilean coup d'état", "Yom Kippur War, Beginning of the Watergate scandal", "First space station, Skylab, is launched", "The Supreme Court of the United States decides Roe v", "Wade", "Death of Pablo Picasso", "First close-up images of Jupiter", "The Sears Tower is completed"],
    1974: ["Turkish occupation of Cyprus", "Carnation Revolution in Portugal begins transition to democracy", "Emperor Haile Selassie I of Ethiopia is overthrown in a military coup", "First close-up images of Mercury", "Discovery of \"Lucy\" (Australopithecus afarensis) in Tanzania's Olduvai Gorge", "World population reaches 4 billion", "Resignation of Richard Nixon"],
    1975: ["The Fall of Saigon ends the Vietnam War", "Death of Francisco Franco; Juan Carlos I becomes King of Spain", "Haile Selassie I dies in mysterious circumstances", "Dmitri Shostakovich dies", "Cambodian Civil War ends with victory for the Khmer Rouge", "The Killing Fields murders begin", "First Cricket World Cup hosted"],
    1976: ["First outbreak of the Ebola virus", "Death of Mao Zedong", "End of Cultural Revolution", "Steve Wozniak invented the Apple I and Steve Jobs then convinced Wozniak to sell the system, giving birth to Apple Computer", "Church Committee"],
    1977: ["Introduction of the first mass-produced personal computers", "Launch of the Voyager spacecraft, currently the most distant man-made objects in the universe", "Queen Alia of Jordan is killed in helicopter crash", "Deaths of Elvis Presley and Charlie Chaplin", "Tenerife disaster marks the deadliest accident in aviation history", "Shaba I conflict involves Safari Club"],
    1978: ["Invention of artificial insulin", "Discovery of Pluto's moon Charon", "Independence of Tuvalu", "Jim Jones's New religious movement The Peoples Temple ends in the organized mass killing and suicide of 920 people", "Birth of the first test-tube baby", "Cambodian-Vietnamese War begins", "Uganda–Tanzania War begins", "War in Afghanistan (1978–present) begins", "Deng Xiaoping commences Economic reform in the People's Republic of China", "Spanish transition to democracy is completed", "John Paul I and then John Paul II become Pope"],
    1979: ["Smallpox eradicated", "Soviet–Afghan War begins", "Rhodesian Bush War ends", "Iranian Revolution and Iran hostage crisis", "Shah Reza Pahlavi forced into exile", "Arrival of Pope John Paul II in Poland, eventually sparking the Solidarity movement", "First close-up images of Saturn", "Margaret Thatcher becomes Prime Minister of the United Kingdom", "Implementation of China's One child policy", "Uganda–Tanzania War ends with defeat for Uganda and the exile of Idi Amin", "Cambodian-Vietnamese War ends with the overthrow of Cambodia's Khmer Rouge regime", "1.7 million people known to have been murdered in The Killing Fields", "Sino-Vietnamese War", "Nicaraguan Revolution", "Central Treaty Organization dissolved"],
    1980: ["Independence of Rhodesia, which becomes Zimbabwe", "Independence of Vanuatu", "Ronald Reagan is elected President of the United States", "1980 eruption of Mount St", "Helens", "Queen Beatrix becomes monarch of the Netherlands", "Beginning of the Iran–Iraq War, Salvadorian Civil War and Contra War", "Assassination of Salvadoran Archbishop Oscar Romero", "Disappearance and death of Azaria Chamberlain", "Solidarity union forms at Poland's Gdańsk Shipyard under Lech Wałęsa, and begins agitation for greater personal freedoms", "Death of John Lennon"],
    1981: ["Independence of Palau", "First orbital flight of the Space Shuttle", "Wedding of Charles, Prince of Wales, and Lady Diana Spencer", "Assassination of Anwar Sadat", "Launch of MTV", "Iran releases the 52 U.S hostages held in Tehran after 444 days", "President Reagan and three others were injured after an assassination attempt"],
    1982: ["Death of Leonid Brezhnev; Yuri Andropov becomes leader of the Soviet Union", "First Israeli invasion of Lebanon", "Falklands War", "Hama massacre in Syria leads to more than 10,000 deaths", "First execution by Lethal injection takes place in Texas", "Sony releases the world's first commercially sold CD Player, the Sony CDP-101", "Princess Grace of Monaco dies following a car accident"]
};